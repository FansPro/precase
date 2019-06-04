import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
const applyMiddlewares = [];
applyMiddlewares.push(thunk);


if(__DEV__) {
    applyMiddlewares.push(createLogger({
        duration: true,
        predicate: () => true,
        // predicate: () => false,
        // 打印immutablejs的state
        stateTransformer: (state) => {
            const result = {};
            Object.keys(state).forEach((key) => {
                if (state[key].toJS) {
                    result[key] = state[key].toJS();
                } else {
                    result[key] = state[key];
                }
            });
            return result;
        },
    }));
}

const applyStoreWithMiddleWare = applyMiddleware(...applyMiddlewares)(createStore);

export default function configureStore(initialState) {
    const store = applyStoreWithMiddleWare(rootReducer, initialState);
    return store;
}



