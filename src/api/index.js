export default {
    async request(opts) {
        this._initUrl(opts);
        this._initMethod(opts);
        this._initHeaders(opts);
        this._initParams(opts);

        //TODO： 请求间隔及缓存策略
        if (!opts.repeat) {
            let timeStamp = new Date().getTime();
        }
        this._buildParams(opts);
        this._sendRequest(opts);
    },
    _initUrl(opts) {
        if ( !opts.url && opts.url === "") throw new Error("url不能为空");
        opts.urlTransfrom = opts.url;
    },
    _initMethod(opts) {
        let method = "post";
        if (opts.method) {
            method = opts.method.toLowerCase();
        }
        opts.methodTransfrom = method;
    },
    _initHeaders(opts) {
      if (opts.headers) {
          opts.headersTransform = opts.headers;
      }   else {
          opts.headersTransform = {
              "Content-Type": "application/x-www-form-urlencoded"
          }
      }
    },
    _initParams(opts) {
        let params = {}
        for (let key in opts.params) {
            if (opts.params[key] && opts.params[key] !== undefined) {
                params[key] = opts.params[key];
            }
        }
        opts.paramsTransfrom = params;
    },
    _buildParams(opts) {
        let method = opts.methodTransfrom.toLowerCase();
        if (method === "get") {
            opts.urlTransfrom += this._generateParamsForGetRequest(opts);
            opts.paramsTransfrom = null;
        } else {
            opts.paramsTransfrom = this._transformJsonToFormFields(opts);
        }
    },
    _generateParamsForGetRequest(opts) {
        let params = this._transformJsonToFormFields(opts);
        if (params !==  "") {
            params += "?" + params;
        }
        return params;
    },
    _transformJsonToFormFields(opts) {
        let formFields = "";
        Object.keys(opts.paramsTransfrom).forEach((key, index) => {
            formFields += `${index === 0 ? "" : "&"}${key}=${encodeURIComponent(opts.params[key])}`;
        });
        return formFields;
    },

    _sendRequest(opts) {

        // TODO: 存储最近一次网络请求时间

        const url = opts.urlTransfrom,
              params = {
                  method: opts.methodTransfrom,
                  headers: opts.headersTransform,
                  body: opts.paramsTransfrom,
              }
        return fetch(url, params)
            .then(response => {
                return response.json();
            })
            .then(json => {

            })
            .catch(e => {
                console.error(e)
            })
    }
}