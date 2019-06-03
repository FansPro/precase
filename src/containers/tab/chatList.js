import React, { Component } from "react";
import {
    View,
    Text,
    TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import * as types from "../../common/actionType";
import XMPP from "react-native-xmpp";


class ChatList extends Component {
    constructor(props) {
        super(props);
        XMPP.on('message', (message) => console.log('MESSAGE:' + JSON.stringify(message)));
        XMPP.on('iq', (message) => console.log('IQ:' + JSON.stringify(message)));
        XMPP.on('presence', (message) => console.log('PRESENCE:' + JSON.stringify(message)));
        XMPP.on('error', (message) => console.log('ERROR:' + message));
        XMPP.on('loginError', (message) => console.log('LOGIN ERROR:' + message));
        XMPP.on('login', (message) => console.log('LOGGED!'));
        XMPP.on('connect', (message) => console.log('CONNECTED!'));
        XMPP.on('disconnect', (message) => console.log('DISCONNECTED!'));
        this.props.logIn();

    }

    render() {
        return (
            <View>
                <Text>this is ChatList Page</Text>
                <TouchableOpacity onPress={this.props.sendMessage}>
                    <Text>发送消息</Text>
                </TouchableOpacity>
            </View>
        )
    }

}
function mapStateToProps() {
    return {

    };
}
function mapDispatchToProps(dispatch) {
    return {
        logIn: () => dispatch({
            type: types.XMPP_CONNECT,
        }),
        sendMessage: () => dispatch({
            type: types.XMPP_SEND_MESSAGE,
        })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChatList);