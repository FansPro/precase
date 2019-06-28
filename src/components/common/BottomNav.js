import React, { Component } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Alert
} from "react-native";
import { connect } from "react-redux";
import I18n from "../../i18n/index";
import bottomNavStyle from "../../style/common/bottomNavStyle";

class BottomNav extends Component {
    render() {
        return <View style={bottomNavStyle.container}>
            <TouchableOpacity style={bottomNavStyle.nav_item} onPress={(tab) => Alert.alert(tab)}>
                <View style={bottomNavStyle.nav_image}/>
                <Text style={bottomNavStyle.nav_text}>首页</Text>
            </TouchableOpacity>
            <TouchableOpacity style={bottomNavStyle.nav_item} onPress={() => this.props.navigation.navigate("chatList")}>
                <View style={bottomNavStyle.nav_image}/>
                <Text style={bottomNavStyle.nav_text}>首页</Text>
            </TouchableOpacity>
            <TouchableOpacity style={bottomNavStyle.nav_item} onPress={() => this.props.navigation.navigate("my")}>
                <View style={bottomNavStyle.nav_image}/>
                <Text style={bottomNavStyle.nav_text}>首页</Text>
            </TouchableOpacity>
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