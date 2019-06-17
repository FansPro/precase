import React from "react";
import Immutable from "immutable";
import DB from "../utils/storage";
import {NativeModules, Platform} from "react-native";
import XMPP from "react-native-xmpp";
import * as types  from "../common/actionType";
const DOMAIN = "testopenfire.winbox88.com";
import IMUI from 'aurora-imui-react-native'
const AuroraIController = IMUI.AuroraIMUIController;
import ChatDao from "../realm/ChatDao"
const fromAvatar = "http://n1.itc.cn/img8/wb/recom/2016/04/22/146131935847875919.JPEG";
const toAvatar = "http://b-ssl.duitang.com/uploads/item/201608/21/20160821230024_MyCYK.thumb.700_0.jpeg";
const DecodeAudioManager = NativeModules.DecodeAudioManager;

const initialState = Immutable.fromJS({
    logIn: false,
    remote: "",
    isChatList: true,
    user: Immutable.fromJS({
        name: "fansx",
        pwd: "123456",
        displayName: "fansx",
        avatarPath: fromAvatar,
        userId: "122343"
    }),
    chatList: Immutable.List(),
    messages: Immutable.List(),
});


function _userForName(name){
    return name + '@' + DOMAIN;
}


export default (state = initialState, action) => {
    let newState = state;
    let chatList = action.chatList ? action.chatList : Immutable.List();
    let list = newState.get("chatList");
    let newChatList = Immutable.List();
    let tempChat = null;
    let tempMessages = Immutable.List();
    let chatMessage = "";
    switch (action.type) {
        case types.XMPP_CONNECT:
            XMPP.trustHosts([DOMAIN])
            XMPP.connect(_userForName(newState.get("user").get("name")), newState.get("user").get("pwd"));
            return newState;
        case types.XMPP_SEND_MESSAGE:
            XMPP.message(JSON.stringify(action.message), _userForName(action.user));
            console.log("fromUser", action.message.fromUser);
            let msg = {
                msgType: action.message.msgType,
                text: action.message.msgType === 'text' ? action.message.text : null,
                mediaPath: action.message.msgType === "text" ? null : action.message.mediaPath,
                duration: action.message.duration ? action.message.duration : null,
                fromUser: {
                    ...action.message.fromUser,
                },
                id: new Date().toTimeString(),
                timeStamp: new Date(),
            }

            switch (action.message.msgType) {
                case "voice":
                    chatMessage = "[语音]";
                    break;
                case "image":
                    chatMessage = "[图片]";
                    break;
                case "text":
                    chatMessage = action.message.text;
                    break;
            }
            list =  list.map(item => {
                if (item.get("name") === action.user) {

                    item =item.set("message", chatMessage);
                    return item;
                }
                return item;
            });

            newState = newState.set("chatList", list);
            ChatDao.saveMessage(action.user, {...msg, fromUser: { ...msg.fromUser}});
            ChatDao.saveChatList({name: action.user, message: chatMessage})
            return newState;
        case types.XMPP_RECEIVE_MESSAGE:

            let jsonMessage = JSON.parse(action.message);
            chatList.map(item => {
                if(item.name === action.name) {
                    tempChat = Immutable.fromJS({
                        ...item,
                        messages: null,
                    });
                } else {
                    newChatList = newChatList.push(Immutable.fromJS({
                        ...item,
                        messages: null,
                    }))
                }
            });
            if(!tempChat) tempChat = Immutable.fromJS({
                name: action.name,
                message: "",
                messages: null,
                unReadNum: 0,
                avatarPath: toAvatar,
                timeStamp: new Date(),
            });

            //
            switch (jsonMessage.msgType) {
                case "voice":
                    chatMessage = "[语音]";
                    break;
                case "image":
                    chatMessage = "[图片]";
                    break;
                case "text":
                    chatMessage = jsonMessage.text;
                    break;
            }
            tempChat = tempChat.set("message", chatMessage);

            //
            if(newState.get("isChatList")) {
                let unReadNum = tempChat.get("unReadNum");
                unReadNum = unReadNum + 1
                tempChat = tempChat.set("unReadNum", unReadNum);
                console.log("temchat", unReadNum );
            }

            newChatList = newChatList.insert(0, tempChat);
            newState = newState.set("chatList", newChatList);
            ChatDao.saveChatList({name: action.name, timeStamp: new Date(), message: chatMessage});
            ChatDao.saveMessage(action.name, { ...jsonMessage, fromUser: jsonMessage.fromUser, id: new Date().toTimeString(), timeStamp: new Date()})
            console.log("wait refresh");
            return newState;
        case types.CHAT_GET_CHATLIST:
            chatList.map(item => {
                newChatList = newChatList.push(Immutable.fromJS({
                    ...item,
                    messages: null,
                }));
            });

            if (newChatList.size === 0) {
                let initChat = {
                    message: "",
                    unReadNum: 0,
                    name: "fansq",
                    avatarPath: toAvatar,
                    messages: [],
                    timeStamp: new Date(),
                }
                newChatList = newChatList.push(Immutable.fromJS({
                    ...initChat,
                }));
                ChatDao.saveChatList({...initChat});
            }
            newState = newState.set("chatList", newChatList);
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
            return newState;
        case types.CHAT_DELETE_CELL:
            list = list.filter(item => item.get("name") !== action.name);
            newState = newState.set("chatList", list);
            ChatDao.deleteChatList(action.name);
            return newState;
        case types.CHAT_ROOM_BACK:
            newState = newState.set("isChatList", true);
            return newState;
        case types.CHAT_MESSAGES:
            action.messages && action.messages.map(item => {
                console.log("item", item);
                tempMessages = tempMessages.push(Immutable.fromJS({
                    ...item,
                    fromUser: Immutable.fromJS({
                        ...item.fromUser,
                    })
                }))
            });
            newState = newState.set("messages", tempMessages);
            return newState;
    }
    return state;
}