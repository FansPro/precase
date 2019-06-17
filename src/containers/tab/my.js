import React, { Component } from "react";
import {
    View,
    Text,
    Alert,
    NativeModules,
} from "react-native";
import * as types from "../../common/actionType"
import { connect } from "react-redux";
import I18n from "../../i18n";
import NavBar from "../../components/common/navBar";
import ChatDao from "../../realm/ChatDao";
const DecodeAudioManager = NativeModules.DecodeAudioManager;
const NativeOpenManager = NativeModules.NativeOpenManager;


class My extends Component {
    constructor(props) {
        super(props);
        this.doRealmAction();

    }
    doRealmAction = () => {
        ChatDao.deleteAll();
        // DecodeAudioManager.decodeAudio();
        console.log("sdfsdf", NativeOpenManager.getMsg())
}


    render() {
        return (
            <View>
                <NavBar title={"我的"}/>
                <Text>123123123</Text>
                <Text>{this.props.count}</Text>
                <Text>{I18n.t("home.h5")}</Text>
            </View>
        )
    }

}
function mapStateToProps(state) {
    const { home, i18n } = state;
    return {
        count: home.count,
        i18n,
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(My);