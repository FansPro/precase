import React, { Component } from "react";
import {
    View,
    Text,
    Modal,
    StatusBar,
    TouchableOpacity,
    Linking,
    Alert,
    NativeModules,
    Platform,
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
import PayTips from "../../components/common/payTips";
import JPushModule from "jpush-react-native";


let codePushOptions = {
    //设置检查更新的频率
    //ON_APP_RESUME APP恢复到前台的时候
    //ON_APP_START APP开启的时候
    //MANUAL 手动检查
    checkFrequency : CodePush.CheckFrequency.ON_APP_RESUME,
    installMode: CodePush.InstallMode.IMMEDIATE,
};

class Home extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
        }
        this.props.setLocale("zh");
    }
    componentDidMount() {
        // JPUSH
        JPushModule.initPush();
        JPushModule.notifyJSDidLoad((result) => {
            console.log("notifi", result);
        });
        JPushModule.addReceiveCustomMsgListener((message) => {
            console.log("custom msg:", message);
        });
        JPushModule.addReceiveNotificationListener((map) => {
            console.log("alertContent: " + map.alertContent);
        });
        JPushModule.addReceiveOpenNotificationListener((map) => {
            console.log("Opening notification!", map);

            // this.props.navigator.replace({name: "HomePage",component:HomePage});

        });
        JPushModule.getInfo((result) => {
            console.log("JPush info", result);
        })
    }

    componentWillMount() {
        CodePush.allowRestart();
        this.syncImmediate();


        if (Platform.OS === "android") {

        }

    }
    componentWillUnmount(): void {
        CodePush.disallowRestart();
    }

    codePushStatusDidChange(syncStatus) {
        switch(syncStatus) {
            case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
                console.log("Checking for update");
                break;
            case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
                console.log("Downloading package");
                this.setState({modalVisible: true});
                break;
            case CodePush.SyncStatus.AWAITING_USER_ACTION:
                console.log("Awaiting user action");
                break;
            case CodePush.SyncStatus.INSTALLING_UPDATE:
                console.log("Installing update");
                this.setState({modalVisible: true});
                break;
            case CodePush.SyncStatus.UP_TO_DATE:
                console.log("App up to date.");
                break;
            case CodePush.SyncStatus.UPDATE_IGNORED:
                console.log("Update cancelled by user.");
                break;
            case CodePush.SyncStatus.UPDATE_INSTALLED:
                console.log("Update installed and will be applied on restart.");
                this.setState({modalVisible: false});
                break;
            case CodePush.SyncStatus.UNKNOWN_ERROR:
                console.log("An unknown error occurred");
                // this.setState({modalVisible: false});
                break;
        }
    }
    codePushDownloadDidProgress = (progress) => {
            let currProgress = parseFloat(progress.receivedBytes / progress.totalBytes).toFixed(2)
            console.log("currProgress", currProgress);
    }

    syncImmediate = () => {
        CodePush.checkForUpdate().then((update) => {
            console.log('-------' + update)
            if (!update) {
                console.log('notNeedUpNode',)
            } else {
                this.setState({modalVisible: true});
                setTimeout(() => this.immediateUpdate(), 500);
            }
        })
    }
    immediateUpdate = () => {
        CodePush.sync( {installMode: CodePush.InstallMode.IMMEDIATE},
        this.codePushStatusDidChange,
        this.codePushDownloadDidProgress);
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

    goScanPage = () => {
        this.props.navigation.navigate("scan");
    }


    render() {
        const name = "fafaffa"
        // let script = "document.getElementsByTagName('body')[0].style.webkitTetSizeAdjust="100%"}"
        return (
            <View style={{position: "absolute", top: 0, left: 0, right: 0, bottom: 0}}>
                <NavBar left={null} title={"首页"}/>
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
                <TouchableOpacity onPress={ this.goScanPage } style={homeStyles.home_cell}>
                    <Text style={homeStyles.home_cell_txt}>{I18n.t("home.scanTest")}</Text>
                </TouchableOpacity>
                <Modal visible={this.state.modalVisible} transparent={true}>
                    <UpdateTips/>
                </Modal>
                {/*<PayTips/>*/}
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