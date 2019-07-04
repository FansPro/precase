import Immutable from "immutable";
import {NAV_READ_MESSAGE} from "../constants/actionType";
const initialState = Immutable.fromJS({
    msgNum: 0,
})

export default (state = initialState, action) => {
    let newState = state;
    switch (action.type) {
        case NAV_READ_MESSAGE:
            let msgNum = newState.get("msgNum");
            newState = newState.set("msgNum", msgNum < 3 ? msgNum + 1 : 0);
            return newState;
    }
    return newState;
}