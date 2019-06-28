import { createAppContainer, createStackNavigator, createBottomTabNavigator } from "react-navigation";
import { navigators, tabs } from "./navigations";
import React, { Component } from "react";
import {
    View,
    Text,
    Animated,
    Easing,
} from "react-native";
import BottomNav from "../components/common/BottomNav";
import StackViewStyleInterpolator from "react-navigation-stack/lib/module/views/StackView/StackViewStyleInterpolator"



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
                header: null,
            }
            routes["tab"] = tab;
        } else {
            routes[navigator["key"]] = navigator;
        }
    })
    return routes;
}

export const AppNavigator = createStackNavigator(
    getNavigation(), {
        defaultNavigationOptions: {
            gesturesEnabled: true,
        },
        transitionConfig: () => ({
            screenInterpolator: StackViewStyleInterpolator.forHorizontal,
        }),
    }

)



