import { createStore, applyMiddleware } from "redux";
import RootReducer from "../reducers";
import reactthunk from "react-thunk";
import { } from "react-logger";
function configureStore(previousState) {
    let store = createStore(RootReducer, previousState,applyMiddleware(reactthunk) )
    return store;
}

export default { configureStore }