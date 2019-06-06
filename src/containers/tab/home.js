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
import { connect } from "react-redux";
import * as types  from "../../common/actionType";
import { Loc, setLocale, getLanguages } from 'react-native-redux-i18n';
import I18n from "../../i18n";
import NavBar from "../../components/common/navBar";
import CodePush from "react-native-code-push";
import UpdateTips from "../../components/common/updateTips";

let codePushOptions = {
    //设置检查更新的频率
    //ON_APP_RESUME APP恢复到前台的时候
    //ON_APP_START APP开启的时候
    //MANUAL 手动检查
    checkFrequency : CodePush.CheckFrequency.ON_APP_START,
    installMode: CodePush.InstallMode.IMMEDIATE,
};

class Home extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        }
        this.props.setLocale("zh");
        this.state = {
            isShow: false,
        }
        console.log("constuctor", this.state.isShow);
    }
    componentDidMount() {
        CodePush.allowRestart();
        this.checkUpdate();
    }
    componentWillUnmount(): void {
        CodePush.disallowRestart();
    }

    checkUpdate = () => {
        setImmediate(() => {
            CodePush.checkForUpdate().then(update => {
                console.log("updateInfo", update);

                if (update) {
                    this.setState({ isShow:  true });
                    CodePush.sync({

                        },
                         (status) => {
                            console.log("status", status);
                        },
                        (progress) => {
                            console.log(progress.receivedBytes + " of " + progress.totalBytes + " received.");
                        }
                    )
                } else {
                    this.setState({isShow: false});
                }
                setTimeout(() => console.log("show", this.state.isShow), 500);
            }).catch(e => {
                console.log("chechError", e);
            })
        })
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
        });
    }
    openMeiqia = () => {
        MeiqiaManager.show();
    }
    changeLan = () => {
        this.props.setLocale( I18n.locale === "zh" ? "en" : "zh");
    }


    render() {
        const name = "fafaffa"
        // let script = "document.getElementsByTagName('body')[0].style.webkitTetSizeAdjust="100%"}"
        return (
            <View style={{position: "absolute", top: 0, left: 0, right: 0, bottom: 0}}>
                <NavBar title={"首页"}/>
                <TouchableOpacity onPress={() => this.changeState()} style={homeStyles.home_cell}>
                    <Text style={homeStyles.home_cell_txt}>{I18n.t("home.h5")}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> this.openLinking() } style={homeStyles.home_cell}>
                    <Text style={homeStyles.home_cell_txt}>{I18n.t("home.openApp")}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> this.openAndroid() } style={homeStyles.home_cell}>
                    <Text style={homeStyles.home_cell_txt}>{I18n.t("home.nativeOpenApp")}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> this.openMeiqia() } style={homeStyles.home_cell}>
                    <Text style={homeStyles.home_cell_txt}>{I18n.t("home.meiqiaTest")}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> this.props.addOne() } style={homeStyles.home_cell}>
                    <Text style={homeStyles.home_cell_txt}>{I18n.t("home.storeTest")}</Text>
                </TouchableOpacity>
                <Text>{this.props.count}</Text>
                <TouchableOpacity onPress={()=> this.changeLan() } style={homeStyles.home_cell}>
                    <Text style={homeStyles.home_cell_txt}>{I18n.t("home.languageTest")}</Text>
                </TouchableOpacity>
                <Modal visible={this.state.isShow} transparent={true}>
                    <UpdateTips/>
                </Modal>
            </View>
        )
    }

}
function mapStateToProps(state) {
    const { home, i18n } = state;
    return {
        count: home.count,
        i18n
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addOne: () => dispatch({
            type: types.ADD,
            num: 1,
        }),
        setLocale: (lacale) => dispatch(setLocale(lacale))
    }
}
Home = CodePush(codePushOptions)(Home);
export default connect(mapStateToProps, mapDispatchToProps)(Home);