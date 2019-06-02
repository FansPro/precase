import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers";
import thunk from "redux-thunk";
import logger from "redux-logger";
const applyMiddlewares = [];
applyMiddlewares.push(thunk);


if(__DEV__) {
    applyMiddlewares.push(logger);
}

const applyStoreWithMiddleWare = applyMiddleware(...applyMiddlewares)(createStore);

export default function configureStore(initialState) {
    const store = applyStoreWithMiddleWare(rootReducer, initialState);
    return store;
}



