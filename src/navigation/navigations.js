import React, { Component } from "react";
import {
    Image,
} from "react-native";

// page
import Home from "../containers/tab/home";
import My from "../containers/tab/my";
import Game from "../containers/game/game";


function createBottomNavConfig(tabBarLabel, tintImg, defaultImg) {
    return {
        tabBarLabel,
        tabBarIcon: (focused) => {
            return focused ? tintImg : defaultImg;
        }
    }
}


export const tabs = {
    "home": {
        screen: Home,
        navigationOptions: createBottomNavConfig("主页", <Image/>, <Image/> )
    },
    "my": {
        screen: My,
        navigationOptions: createBottomNavConfig("我的", <Image/>, <Image/> )
    }
}
export const navigators = [
    { screen: tabs, isTab: true, key: "tab"},
    { key: "game", screen: Game, title: "游戏", navigationOptions: { header: null}}
];

export const pages = {
    home: "home",
    my: "my",
    game: "game"
}