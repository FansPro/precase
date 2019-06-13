import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    StatusBar,
    TouchableOpacity,
} from "react-native";
import PropTypes from "prop-types";
import navBarStyles from "../../style/common/navBarStyle";
import backIcon from "../../../assets/img/icon_back.png";

class NavBar extends Component {

    render() {
        const { title, left, leftAction, right, rightAction } = this.props;
        return <View style={{...navBarStyles.container, backgroundColor: !this.props.transparent ? "#4D78B0" : "rgba(0,0,0,0.5)"}}>
            <StatusBar translucent hidden={false} barStyle={"light-content"} backgroundColor="transparent" />
            <View style={navBarStyles.content}>
                <View style={{...navBarStyles.content_bar}}>
                    {left && typeof left !== "Boolean" && <TouchableOpacity onPress={leftAction}>
                        {left}
                    </TouchableOpacity>}
                    {
                        !left && <TouchableOpacity onPress={() => leftAction ? leftAction() : this.props.navigation.goBack()}>
                            <View style={{height: 46, width:46, display:"flex", justifyContent: "center" }}>
                                <Image style={{marginLeft: 10,}} source={backIcon}/>
                            </View>
                        </TouchableOpacity>
                    }
                </View>
                <View style={{...navBarStyles.content_bar, justifyContent: "center"}}>
                    {title && <Text style={navBarStyles.content_title}>{title}</Text>}
                </View>
                <View style={{...navBarStyles.content_bar, justifyContent: "flex-end"}}>
                    {right && <TouchableOpacity onPress={rightAction}>
                        {right}
                    </TouchableOpacity> }
                </View>
            </View>
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