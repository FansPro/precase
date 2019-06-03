import React from "react";
import { NativeModules } from "react-native";
import XMPP from "react-native-xmpp";
import * as types  from "../common/actionType";
const DOMAIN = "testopenfire.winbox88.com";
const SCHEMA = "ios";
const initialState = {
    logIn: false,
    remote: "",
}
const RNXMPP = NativeModules.RNXMPP;


function _userForName(name){
    return name + '@' + DOMAIN;
}
export default (state = initialState, action) => {
    switch (action.type) {
        case types.XMPP_CONNECT:
            // XMPP.connect(_userForName("admin"), "abcd!!!xyz");
            XMPP.trustHosts([DOMAIN])
            XMPP.connect(_userForName("fansx"), "123456");
            return state;
        case types.XMPP_SEND_MESSAGE:
            XMPP.message("hello word!", _userForName("fansx"));
            return state;
    }
    return state;
}