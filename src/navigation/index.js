import { createAppContainer, createStackNavigator, createBottomTabNavigator } from "react-navigation";
import { navigators, tabs } from "./navigations";
import React, { Component } from "react";
import {
    View,
    Text
} from "react-native";
import BottomNav from "../components/common/BottomNav";


function getNavigation() {
    let routes = {};
    navigators.map(navigator => {
        if (navigator.isTab) {
            let tab = createBottomTabNavigator(navigator.screen, {
                // tabBarComponent: () => {
                //    return <BottomNav/>
                // },
            });
            tab.navigationOptions = {
                mode: "card",

            }
            routes["tab"] = tab;
        } else {
            routes[navigator["key"]] = navigator;
        }
    })
    return routes;
}

const AppNavigator = createStackNavigator(
    getNavigation()
)

export const AppContainer = createAppContainer(
    AppNavigator
)

