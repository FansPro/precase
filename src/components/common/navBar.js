import React, { Component } from "react";
import {
    View,
    Text,
    StatusBar,
} from "react-native";
import PropTypes from "prop-types";
import navBarStyles from "../../style/common/navBarStyle";

class NavBar extends Component {
    render() {
        return <View style={navBarStyles.container}>

        </View>
    }
}

NavBar.propTypes = {
    title: PropTypes.string, // title,
    left: PropTypes.any, // 判断是否有返回或自定义按钮
    leftAction: PropTypes.func,
    right: PropTypes.element, //
    rightAction: PropTypes.func,
}

export default NavBar;