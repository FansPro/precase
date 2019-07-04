import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { createReactNavigationReduxMiddleware } from "react-navigation-redux-helpers";
import api from "../middleware/api";
const applyMiddlewares = [];
applyMiddlewares.push(thunk);

const navMiddleware = createReactNavigationReduxMiddleware(
    state => state.nav,
    "root",
)
applyMiddlewares.push(navMiddleware);
applyMiddlewares.push(api);
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



