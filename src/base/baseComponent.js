import React, { Component } from "react";
import {
    View,
    SafeAreaView,
} from "react-native";
import DeviceInfo from "../utils/deviceInfo";
import Loading from "../components/common/loading";


class BaseComponent extends Component {


    navPush(routeName = null, params = null) {
        this.props.navigation.push(routeName, params)
    }
    navPop() {
        this.props.navigation.pop();
    }
    navJump(routeName = null, params = null) {
        this.props.navigation.navigate(routeName, params);
    }
    navBack(routeName = null, params = null) {
        this.props.navigation.state.params && this.props.navigation.state.params.callback
        && this.props.navigation.state.params.callback(params);
        this.props.navigation.goBack(routeName);
    }
    navTo(routeName = null, params) {
        this.props.navigation.replace(routeName, params);
    }


    renderMain() {
    }
    render() {
        if(DeviceInfo.isIphoneX) {
            return <SafeAreaView style={{position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "white"}}>
                {this.renderMain()}
                <Loading/>
            </SafeAreaView>
        } else {
            return <View style={{flex: 1}}>
                {this.renderMain()}
                <Loading/>
            </View>
        }
    }
}
export default BaseComponent;