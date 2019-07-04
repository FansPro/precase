import { API_HOST } from "../constants/urlConfig";
import {CALL_API} from "../constants/actionType";
import {CACHE_CB, NO_CACHE, ONLY_CACHE} from "../constants/cache";
import md5 from "md5";
import DB from "../utils/storage";
/**
 * 请求超时处理
 * @param url 请求URL
 * @param opts 请求参数
 * @returns {Promise<any>}
 */
const timeoutFetch = (url, opts) => {
    let timeoutPromise = new Promise((resolve, reject) => {
        this.timer = setTimeout(() => {
            reject("Timeout Error");
        }, 3000)
    });
    let originalFetch = fetch(url, opts);
    let finalPromise  = new Promise.race([
        originalFetch,
        timeoutPromise
    ]);
    return finalPromise;
};

function callApi(url, { body, token, ...others }) {
    let fullUrl = url.indexOf("http") === -1 ? API_HOST + url : API_HOST;
    let options;
    if (others.method === "GET") {
        if (body) fullUrl += `${fullUrl.indexOf("?") === -1 ? "?" : "&"}${body}`;
        options = others;
    } else {
        options = {
            body,
            ...others,
        }
    }
    timeoutFetch(url, options).then(response => {
        return response.toJSON();
    }).then(response => {
        return response.text().then(text => {
            let json = null;
            let result;
            try {
                json = JSON.parse(text);
            } catch (e) {
                json = null;
            } finally {
                if (!json || response.status > 300 || response.status < 200) {
                    if(!json) {
                        return Promise.reject(new Error("连接错误"));
                    } else return Promise.reject(new Error(text));
                }
                return Promise.resolve(json);
            }
        })
    }).catch(error => {
        if(this.timer) {
            this.timer = null;
        }
    });
}

export default store => next => (action) => {
    if (action.type !== CALL_API) {
        return next(action);
    }

    //
    function actionWith(data) {
        let finalAction = Object.assign({},action, data);
        delete finalAction(CALL_API);
        return finalAction;
    }

    const {
        method = "POST",
        headers = {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body = {},
        cache = NO_CACHE,
        requestOnlyWhen,
        success,
        fail,
        done,
        noRepeat
    } = action.payload;
    const api = action.payload.api
    const params = body;

    let postBody;
    if (headers['Content-Type'].startsWith('multipart/form-data')) {
        postBody = new FormData();
        Object.keys(params).forEach(key => {
            let value = params[key];
            if (Array.isArray(value) || Immutable.List.isList(value)) {
                value.forEach(item => postBody.append(key, item));
            } else {
                postBody.append(key, value);
            }
        })
    } else {
        let paramsArray = Object.keys(params).forEach(key => key + "=" + encodeURIComponent(params[key]));
        postBody = paramsArray.join("&");
    }

    const options = {
        method,
        headers,
        body: postBody,
    }

    const id = md5(JSON.stringify({
        api,
        body,
        headers,
    }));

    DB.get(id).then((cacheData) => {

        //
        if (cacheData && cache !== NO_CACHE) {
            if (typeof success === "string") {
                next(actionWith({
                    response: cacheData.response,
                    type: success,
                }));
            } else {
                success(cacheData.response);
            }

            if (cache === ONLY_CACHE) {
                return null;
            }
        }

        const timeStamp = new Date().getTime();

        callApi(api,options).then(response => {
            //
            if (response.status !== 200) {
                let msgStr = response.message || "服务器异常";
                return Promise.reject({
                    message: msgStr,
                    code: response.code,
                });
            }

            let result = response.result;
            if (!result && result !== 0) {
                result === response;
            }

            if (cache !== NO_CACHE) {
                DB.put(id, {
                    response: result,
                    updateAt: new Date().getTime(),
                })
            }

            if (!cacheData || cache === CACHE_CB || cache === NO_CACHE) {
                if (typeof success === "string") {
                    next(actionWith({
                        response: result,
                        type: success,
                    }));
                }  else {
                    success(result);
                }
            }
            return null;
        }).catch(error => {

        })
        return null;
    })
    return null;

}