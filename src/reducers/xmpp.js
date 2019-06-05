import React from "react";
import Immutable from "immutable";
import DB from "../utils/storage";
import {NativeModules, Platform} from "react-native";
import XMPP from "react-native-xmpp";
import * as types  from "../common/actionType";
const DOMAIN = "testopenfire.winbox88.com";
import IMUI from 'aurora-imui-react-native'
const AuroraIController = IMUI.AuroraIMUIController;


const SCHEMA = "ios";
const initialState = Immutable.fromJS({
        logIn: false,
        remote: "",
        isChatList: true,
        user: Immutable.fromJS({
            name: "FansX",
            pwd: "123456",
        }),
        chatList: Immutable.List(),
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
    let chatList = action.chatList ? action.chatList : Immutable.List();
    let list = newState.get("chatList");
    let newChatList = Immutable.List();
    let tempChat = null;
    let tempMessages = Immutable.List();
    switch (action.type) {
        case types.XMPP_CONNECT:
            // XMPP.connect(_userForName("admin"), "abcd!!!xyz");
            XMPP.trustHosts([DOMAIN])
            XMPP.connect(_userForName(newState.get("user").get("name")), newState.get("user").get("pwd"));
            return newState;
        case types.XMPP_SEND_MESSAGE:
            XMPP.message(action.message, _userForName(action.userId));
            list =  list.map(item => {
                if (item.get("name") === action.userId) {
                    let messages = item.get("messages");
                    console.log("messages", messages);
                    messages =  messages.push(Immutable.fromJS({
                        message: action.message,
                        name: action.fromUser,
                    }));
                    item =item.set("message", action.message);
                    item = item.set("messages", messages);
                    return item;
                }
                return item;
            });
            DB.put("chatList", list);
            newState = newState.set("chatList", list);
            return newState;
        case types.XMPP_RECEIVE_MESSAGE:
            var message = constructNormalMessage()
            message.msgType = 'text';
            message.text = action.message;
            message.isOutgoing = false;
            AuroraIController.appendMessages([message]);
            chatList.map(item => {
                tempMessages = Immutable.List();
                item.messages && item.messages.length > 0 && item.messages.map(itemm => {
                    tempMessages = tempMessages.push(Immutable.fromJS({
                        ...itemm
                    }))
                })
                if(item.name === action.name) {
                    tempChat = Immutable.fromJS({
                        messages: tempMessages,
                        ...item,
                    });
                } else {
                    newChatList = newChatList.push(Immutable.fromJS({
                        messages: tempMessages,
                        ...item,
                    }))
                }
            });
            if(!tempChat) tempChat = Immutable.fromJS({
                name: action.name,
                message: "",
                messages: Immutable.List(),
                unReadNum: 0,
            });
            let messages = tempChat.get("messages");
            messages = messages.push(Immutable.fromJS({
                name: action.name,
                message: action.message,
            }));
            tempChat = tempChat.set("messages", messages);
            tempChat = tempChat.set("message", action.message);
            if(newState.get("isChatList")) {
                let unReadNum = tempChat.get("unReadNum");
                tempChat = tempChat.set("unReadNum", unReadNum + 1);
            }
            console.log("ERROR - CHAT", newChatList, tempChat);
            newChatList = newChatList.insert(0, tempChat);
            console.log("ERROR - CHAT", newChatList, tempChat);
            newState = newState.set("chatList", newChatList);
            DB.put("chatList", newChatList);
            return newState;
        case types.CHAT_GET_CHATLIST:

            chatList.map(item => {
                tempMessages = Immutable.List();
                item.messages && item.messages.length > 0 && item.messages.map(itemm => {
                    tempMessages = tempMessages.push(Immutable.fromJS({
                        ...itemm
                    }))
                })
                if(action.name && action.name === item.name) {
                    tempChat = Immutable.fromJS({
                        messages: tempMessages,
                        ...item,
                    });
                } else {
                   newChatList = newChatList.push(Immutable.fromJS({
                       messages: tempMessages,
                        ...item
                    }));
                }
            });
            if(action.name && !tempChat) {
                tempChat = Immutable.fromJS({
                    message: "",
                    unReadNum: 0,
                    name: action.name,
                    messages: Immutable.List(),
                });
            }
            if (tempChat) {
                newChatList = newChatList.insert(0, tempChat);
            }
            newState = newState.set("chatList", newChatList);
            DB.put("chatList", newChatList);
            return newState;
        case types.CHAT_GO_ROOM:

            list = list.map(item => {
                if (item.get("name") === action.name) {
                    item = item.set("unReadNum", 0);
                    return item;
                }
                return item;
            });
            newState = newState.set("chatList", list);
            newState = newState.set("isChatList", false);
            DB.put("chatList", list);
            return newState;
        case types.CHAT_DELETE_CELL:
            list = list.filter(item => item.get("name") !== action.name);
            newState = newState.set("chatList", list);
            DB.put("chatList", list);
            return newState;
    }
    return state;
}