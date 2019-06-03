import { combineReducers } from "redux";
import { reducer as i18n } from 'react-native-redux-i18n'
import home from "./home";
import xmpp from "./xmpp";

const RootReducer = combineReducers({
    home,
    i18n,
    xmpp,
});
export default RootReducer;