import React, { Component } from "react";
import {
    View,
    Text,
    Modal,
    StatusBar,
    TouchableOpacity,
    Linking,
    Alert,
} from "react-native";
import { WebView, WebViewProps } from "react-native-webview";


class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
        }
    }
    changeState = () => {
        console.log("sss");
        this.setState({
            visible: !this.state.visible,
        })
    }
    openLinking = () => {
        const appUrl = "winboxcd://";
        Linking.canOpenURL(appUrl).then(rs => {
            if (rs) {
                Linking.openURL(appUrl);
            }
        })

    }
    render() {
        let gameUrl = "http://ekortest.fb88.net/?sn=92a02193452d49ad94838509d179c4eb&token=31e8599633d84eda93e6ccb8cc3fce7e&loginid=EKO225";
        // let script = "document.getElementsByTagName('body')[0].style.webkitTetSizeAdjust="100%"}"
        return (
            <View style={{position: "absolute", top: 0, left: 0, right: 0, bottom: 0}}>
                <StatusBar barStyle={'light-content'} hidden/>
                <TouchableOpacity onPress={() => this.changeState()} style={{height: 60, backgroundColor: "#f6f6f6"}}></TouchableOpacity>
                <TouchableOpacity onPress={()=> this.openLinking() }>
                    <Text style={{ height: 60, backgroundColor: "#f6f6f6", marginTop: 10}}>123123</Text>
                </TouchableOpacity>
                <Modal visible={this.state.visible}>
                    <WebView
                        style={{flex: 1}}
                        source={{uri: gameUrl}}
                    />
                </Modal>
            </View>
        )
    }

}
export default Home;