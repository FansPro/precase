import * as types  from "../common/actionType";
const initialState = {
    count: 0,
}

export default (state = initialState, action) => {
    let newState = state;
    switch (action.type) {
        case types.ADD:
            newState = Object.assign({}, newState, {
                count: state.count + 1,
            })
            return newState;
    }
    return state;
}
