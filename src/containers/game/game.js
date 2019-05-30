import React, { Component } from "react";
import {
    View,
    Text,
} from "react-native";
import { WebView } from "react-native-webview";

class Game extends Component {
    static navigationOptions = {
        mode: "card",
    }
    constructor(props) {
        super(props);
    }

    render() {
        let gameUrl = "http://ekortest.fb88.net/?sn=92a02193452d49ad94838509d179c4eb&token=31e8599633d84eda93e6ccb8cc3fce7e&loginid=EKO225";
        return (
            <WebView
                style={{flex: 1}}
                source={{uri: gameUrl}}
            />
        )
    }

}
export default Game;