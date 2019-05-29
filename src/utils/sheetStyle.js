/**
 *  不同平台的style设置
 */
import React from "react"
import {
    StyleSheet,
    Platform,
} from "react-native";

function create(styles) {
    let platformStyles = {};
    Object.keys(styles).map(key => {
        const { ios, android, ...style } = styles[key];
        let tmpStyle = style;
        if (ios && Platform.OS === "ios") {
            tmpStyle = { ...ios, ...style};
        }
        if (android && Platform.OS === "android") {
            tmpStyle = { ...android, ...style};
        }
        platformStyles[key] = tmpStyle;
    })
    const result = StyleSheet.create(platformStyles)
    return result;
}

export default {
    ...StyleSheet,
    create,
}