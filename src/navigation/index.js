import { createAppContainer, createStackNavigator, createBottomTabNavigator } from "react-navigation";
import { navigators, tabs } from "./navigations";


function getNavigation() {
    let routes = {};
    navigators.map(navigator => {
        if (navigator.isTab) {
            let tab = createBottomTabNavigator(navigator.screen);
            tab.navigationOptions = {
                header: null,
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