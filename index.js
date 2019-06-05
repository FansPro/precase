/**
 * @format
 */
import React, { Component } from "react";
import {
    Text
} from "react-native";
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// 固定系统字体大小
let textRender = Text.render;
Text.render = function () {
    let originText = textRender.apply(this, arguments);
    return React.cloneElement(originText, {allowFontScaling: false ,style: [{includeFontPadding: false, textAlignVertical: 'center'},
            originText.props.style]}, originText.props.children)
};
AppRegistry.registerComponent(appName, () => App);
