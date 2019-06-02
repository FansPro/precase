import React, { Component } from "react";
import {
    View,
    Text,
} from "react-native";
import { connect } from "react-redux";
import I18n from "../../i18n/index";

class BottomNav extends Component {
    render() {
        return <View style={{height: 49, backgroundColor: "red", width: 375}}>
            <Text>{I18n.t("home.h5")}</Text>
        </View>
    }

}

function mapStateToProps(state) {
    const { home, i18n } = state;
    return {
        count: home.count,
        i18n
    }
}
export default connect(mapStateToProps)(BottomNav);