import React, { Component } from "react";
import {
    View,
    Text,
    Modal,
    StatusBar,
    TouchableOpacity,
    Linking,
    Alert,
    NativeModules
} from "react-native";
import { WebView, WebViewProps } from "react-native-webview";
import BaseComponent from "../../base/baseComponent";
import homeStyles from "../../style/home/homeStyle";
const NativeOpenManager = NativeModules.NativeOpenManager;
const MeiqiaManager = NativeModules.MeiqiaManager;


class Home extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
        }
    }
    changeState = () => {
        console.log("sss");
        this.navPush("game")
    }
    openLinking = () => {
        const appUrl = "winboxcd://";
        Linking.canOpenURL(appUrl).then(rs => {
            console.log("link", rs);
            if (rs) {
                Linking.openURL(appUrl);
            } else {
                Alert.alert("请先安装此应用");
            }
        })

    }
    openAndroid = () => {
        NativeOpenManager.open("com.wakedemo").then(rs => {
            Alert.alert(rs);
        });
    }
    openMeiqia = () => {
        MeiqiaManager.show();
    }

    render() {

        // let script = "document.getElementsByTagName('body')[0].style.webkitTetSizeAdjust="100%"}"
        return (
            <View style={{position: "absolute", top: 0, left: 0, right: 0, bottom: 0}}>
                <StatusBar barStyle={'light-content'} hidden/>
                <TouchableOpacity onPress={() => this.changeState()} style={homeStyles.home_cell}>
                    <Text style={homeStyles.home_cell_txt}>游戏H5测试</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> this.openLinking() } style={homeStyles.home_cell}>
                    <Text style={homeStyles.home_cell_txt}>应用跳转测试</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> this.openAndroid() } style={homeStyles.home_cell}>
                    <Text style={homeStyles.home_cell_txt}>应用跳转原生测试</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> this.openMeiqia() } style={homeStyles.home_cell}>
                    <Text style={homeStyles.home_cell_txt}>美洽客服测试</Text>
                </TouchableOpacity>
            </View>
        )
    }

}
export default Home;