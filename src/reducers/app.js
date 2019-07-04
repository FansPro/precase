import Immutable from "immutable";
import {APP_SHOW_LOADING} from "../constants/actionType";

const initialState = Immutable.fromJS({
    loading: true,
});

export default (state = initialState, action) => {
    let newState = state;
    switch (action.type) {
        case APP_SHOW_LOADING:
            newState = newState.set("loading", action.loading);
            return newState;
    }
    return newState;
};