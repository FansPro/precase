import React, { Component } from "react";
import {
    Image,
} from "react-native";

// page
import Home from "../containers/tab/home";
import My from "../containers/tab/my";
import ChatList from "../containers/tab/chatList";
import Game from "../containers/game/game";
import ChatRoom from "../containers/chat/chatRoom";
import Scan from "../containers/scan/scan";
import ChatAdd from "../containers/chat/chatAdd";
import Login from "../containers/auth/login";


function createBottomNavConfig(tabBarLabel, tintImg, defaultImg) {
    return {
        tabBarLabel,
        tabBarIcon: (focused) => {
            return focused ? tintImg : defaultImg;
        },
        tabBarOptions: {
            activeTintColor: "#4D78B0",
            activeBackgroundColor: "#f6f6f6"
        },
    }
}


export const tabs = {
    "home": {
        screen: Home,

        navigationOptions: createBottomNavConfig("首页", <Image/>, <Image/> )
    },
    "chatList": {
        screen: ChatList,
        navigationOptions: createBottomNavConfig("好友", <Image/>, <Image/> )
    },
    "my": {
        screen: My,
        navigationOptions: createBottomNavConfig("我的", <Image/>, <Image/> )
    }
}
export const navigators = [
    { screen: tabs, isTab: true, key: "tab"},

    { key: "game", screen: Game, title: "游戏", navigationOptions: { headerTitle: "游戏"}},
    { key: "chatRoom", screen: ChatRoom, title: "聊天", navigationOptions: {header: null}},
    {key: "scan", screen: Scan, title: "扫码",  navigationOptions: {header: null}},
    {key: "login", screen: Login, title: "登录",  navigationOptions: {header: null}},
    {key: "chatAdd", screen: ChatAdd, title: "添加聊天",  navigationOptions: {header: null}},

];

export const pages = {
    home: "home",
    my: "my",
    game: "game",
    chatRoom: "chatRoom",
    chatAdd: "chatAdd",
    login: "login",
}