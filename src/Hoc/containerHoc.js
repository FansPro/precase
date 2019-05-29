import React, { Component } from "react";
import {
    View
} from "react-native";
import Screen from "../utils/screenUtil";

export const containerHoc = WrapperComponent => class extends Component {
    render() {
        return (
            <Screen.FixWidthView>
                <WrapperComponent/>
            </Screen.FixWidthView>
        )
    }
}