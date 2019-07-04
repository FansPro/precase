import React, { Component } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    SafeAreaView
} from "react-native";
import { connect } from "react-redux";
import I18n from "../../i18n/index";
import bottomNavStyle from "../../style/common/bottomNavStyle";
import {NAV_READ_MESSAGE} from "../../constants/actionType";
import icon_home from "../../../assets/img/tab/icon_home.png";
import icon_home_tint from "../../../assets/img/tab/icon_home_tint.png";
import icon_chat from "../../../assets/img/tab/icon_serve.png";
import icon_chat_tint from "../../../assets/img/tab/icon_serve_tint.png";
import icon_my from "../../../assets/img/tab/icon_my.png";
import icon_my_tint from "../../../assets/img/tab/icon_my_tint.png";
import DeviceInfo from "../../utils/deviceInfo";


class BottomNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0, // 默认tab selectIndex
        }
    }
    // tab切换及高亮
    selectIndex = (index) => {
        if(index === this.state.currentIndex) return;
        this.props.readMessage();
        const { navigate } = this.props.navigation;
        switch (index) {
            case 0:
                navigate("home");
                break;
            case 1:
                navigate("chatList");
                break;
            case 2:
                navigate("my");
                break;
            default:
                break;
        }
        this.setState({currentIndex: index});
    }

    renderTabItem = (index, title, icon, tintIcon) => {
        const { currentIndex } = this.state;
        return <TouchableOpacity activeOpacity={0.9}  style={bottomNavStyle.nav_item} onPress={() => this.selectIndex(index)}>
            <View style={bottomNavStyle.nav_item_content}>
                <Image source={currentIndex === index ? tintIcon : icon} style={bottomNavStyle.nav_image}/>
                <Text style={ currentIndex === index ? bottomNavStyle.nav_text_tint : bottomNavStyle.nav_text}>{title}</Text>
                {this.props.msgNum > 0 && index === 2 && <View style={bottomNavStyle.nav_point}>
                    <Text style={bottomNavStyle.nav_msg}>{this.props.msgNum}</Text>
                </View>}
            </View>
        </TouchableOpacity>
    }
    renderNav = () => {
        return <View style={bottomNavStyle.container}>
            {this.renderTabItem(0,"首页", icon_home, icon_home_tint)}
            {this.renderTabItem(1,"消息", icon_chat, icon_chat_tint)}
            {this.renderTabItem(2,"我的", icon_my, icon_my_tint)}
        </View>
    }
    render() {
        return DeviceInfo.isIphoneX ? <SafeAreaView>
            {this.renderNav()}
        </SafeAreaView> : this.renderNav();
    }

}

function mapStateToProps(state) {
    const { home, i18n, bottomNav } = state;
    return {
        count: home.count,
        msgNum: bottomNav.get("msgNum"),
        i18n
    }
}
function mapDispatchToProps(dispatch) {
    return {
        readMessage: () => dispatch({
            type: NAV_READ_MESSAGE,
        })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BottomNav);