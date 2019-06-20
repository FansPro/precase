import { NavigationActions } from "react-navigation";
import { AppNavigator } from "../navigation/index";

const rootAction = AppNavigator.router.getActionForPathAndParams("tab");
const rootState = AppNavigator.router.getStateForAction(rootAction);
// const loginAction = AppNavigator.router.getActionForPathAndParams("login");
const initialState = AppNavigator.router.getStateForAction(rootAction, rootState);


export default (state = initialState, action) => {
    let nextState;
    switch (action.type){
        case 'Login':
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.back(),
                state
            )
            break;
        case 'Logout':
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'login' }),
                state
            );
            break;
        case 'BackTwoScreen':
            const key = state.routes[state.index-1].key
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.back({key:key}),
                state
            )
            break;
        case 'ExitApp':
            nextState = initialState;
            break;
        default:
            nextState = AppNavigator.router.getStateForAction(action, state);
            break;
    }
    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;
}