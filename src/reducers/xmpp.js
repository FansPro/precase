import React from "react";
import Immutable from "immutable";
import {NativeModules, Platform} from "react-native";
import XMPP from "react-native-xmpp";
import * as types  from "../common/actionType";
const DOMAIN = "testopenfire.winbox88.com";
import IMUI from 'aurora-imui-react-native'
const AuroraIController = IMUI.AuroraIMUIController

const SCHEMA = "ios";
const initialState = Immutable.fromJS({
        logIn: false,
        remote: "",

        user: Immutable.fromJS({
            name: "FansX",
            pwd: "123456",
        }),
        chatList: Immutable.List([
            Immutable.fromJS({
                name: "fansq",
                unRead: false,
                message: '',
                messages: Immutable.List(),
            }),
            Immutable.fromJS({
                name: "fansg",
                unRead: false,
                message: '',
                messages: Immutable.List(),
            }),
        ]),
});
const RNXMPP = NativeModules.RNXMPP;


function _userForName(name){
    return name + '@' + DOMAIN;
}
var themsgid = 1
function constructNormalMessage() {

    var message = {}
    message.msgId = themsgid.toString()
    themsgid += 1
    message.status = "send_succeed"
    message.isOutgoing = true;
    var date = new Date()
    message.timeString = date.getHours() + ":" + date.getMinutes()
    var user = {
        userId: "",
        displayName: "replace your nickname",
        avatarPath: "images"
    }
    if (Platform.OS === "ios") {
        user.avatarPath = RNFS.MainBundlePath + '/default_header.png'
    }
    message.fromUser = user

    return message
}

export default (state = initialState, action) => {
    let newState = state;
    let chatList = newState.get("chatList");
    switch (action.type) {
        case types.XMPP_CONNECT:
            // XMPP.connect(_userForName("admin"), "abcd!!!xyz");
            XMPP.trustHosts([DOMAIN])
            XMPP.connect(_userForName(newState.get("user").get("name")), newState.get("user").get("pwd"));
            return newState;
        case types.XMPP_SEND_MESSAGE:
            XMPP.message(action.message, _userForName(action.userId));

            console.log("chatList", chatList);
            chatList =  chatList.map(item => {
                console.log("info", item.get("name"), action.userId);
                if (item.get("name") === action.userId) {
                    let messages = item.get("messages");
                    console.log("messages", messages);
                    messages =  messages.push({
                        message: action.message,
                        fromUser: action.fromUser,
                    });
                    item = item.set("messages", messages);
                    console.log("item", item, action.message)
                    return item;
                }
                return item;
            });
            newState = newState.set("chatList", chatList);
            return newState;
        case types.XMPP_RECEIVE_MESSAGE:
            var message = constructNormalMessage()
            message.msgType = 'text';
            message.text = action.message;
            message.isOutgoing = false;
            AuroraIController.appendMessages([message])
            chatList = chatList.map(item => {
                console.log("info000", item.get("name"), action.name);
                if(item.get("name") === action.name) {
                    let messages = item.get("messages");
                    console.log("messages", messages);
                    messages =  messages.push({
                        message: action.message,
                        fromUser: action.name,
                    });
                    item = item.set("messages", messages);
                    console.log("item", messages, action.message);
                    item = item.set("message", action.message);
                    item = item.set("unRead", true);
                    return item;
                }
                return item;
            });
            newState = newState.set("chatList", chatList);
            return newState;
    }
    return state;
}