import React, { Component } from "react";
import {
    View,
    Text,
} from "react-native";
import * as types from "../../common/actionType"
import { connect } from "react-redux";
import I18n from "../../i18n";
import NavBar from "../../components/common/navBar";
import Realm from "realm";

class My extends Component {
    constructor(props) {
        super(props);

        this.doRealmAction();
    }

    doRealmAction = () => {
        let currentVersion = Realm.schemaVersion(Realm.defaultPath);
        console.log("currentVersion", currentVersion);
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