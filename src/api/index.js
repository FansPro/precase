import {CALL_API} from "../constants/actionType";

export function callApi(params) {
    return {
        type: CALL_API,
        payload: params,
    }
}