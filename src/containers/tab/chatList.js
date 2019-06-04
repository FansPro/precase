import React, { Component } from "react";
import {
    View,
    Text,
    TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import * as types from "../../common/actionType";
import XMPP from "react-native-xmpp";
import ChatCell from "../../components/chat/chatCell";
import Swipeout from "react-native-swipeout";
import List from "../../components/common/list";
import NavBar from "../../components/common/navBar";
import chatListStyle from "../../style/chat/chatListStyle"

var swipeoutBtns = [
    {
        text: "置顶",

    },
    {
        text: '删除',
        onPress: (ss) => {
            console.log("asfjkasdf", ss);
        },
        backgroundColor: "red",
    }
]


class ChatList extends Component {
    constructor(props) {
        super(props);
        XMPP.on('message', this.onReceiveMessage);
        XMPP.on('iq', (message) => console.log('IQ:' + JSON.stringify(message)));
        XMPP.on('presence', (message) => console.log('PRESENCE:' + JSON.stringify(message)));
        XMPP.on('error', (message) => console.log('ERROR:' + message));
        XMPP.on('loginError', (message) => console.log('LOGIN ERROR:' + message));
        XMPP.on('login', (message) => console.log('LOGGED!'));
        XMPP.on('connect', (message) => console.log('CONNECTED!'));
        XMPP.on('disconnect', (message) => console.log('DISCONNECTED!'));
        this.props.logIn();

    }

    onReceiveMessage = ({from, body}) => {
        console.log("onReceiveMessage")
        // extract username from XMPP UID
        if (!from || !body){
            return;
        }
        var name = from.match(/^([^@]*)@/)[1];
        console.log("receive",from, body, name);
        this.props.receiveMessage(name, body);
        // this.conversation.unshift({own:false, text:body});
    }
    renderCell = (item) => {
        return  <Swipeout right={swipeoutBtns} key={item.index}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("chatRoom", { name: item.item.get("name") })}>
                <ChatCell unRead={item.item.get("unRead")} name={item.item.get("name")} message={item.item.get("message")}/>
            </TouchableOpacity>
        </Swipeout>
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <NavBar title={"消息"} right={<Text style={chatListStyle.nav_right}>+</Text>}/>
                {/*<Text>this is ChatList Page</Text>*/}
                {/*<TouchableOpacity onPress={this.props.sendMessage}>*/}
                {/*    <Text>发送消息</Text>*/}
                {/*</TouchableOpacity>*/}
                {/*<TouchableOpacity onPress={() => this.props.navigation.navigate("chatRoom")}>*/}
                {/*    <Text>聊天</Text>*/}
                {/*</TouchableOpacity>*/}
                <List ds={this.props.chatList} renderCell={this.renderCell}/>
            </View>
        )
    }

}


function mapStateToProps(state) {
    const { xmpp } = state;

    console.log("sdsad", xmpp.get("chatList"));
    return {
        chatList: xmpp.get("chatList").toArray(),
    };
}
function mapDispatchToProps(dispatch) {
    return {
        logIn: () => dispatch({
            type: types.XMPP_CONNECT,
        }),
        sendMessage: () => dispatch({
            type: types.XMPP_SEND_MESSAGE,
        }),
        receiveMessage: (name, message) => dispatch({
            type: types.XMPP_RECEIVE_MESSAGE,
            message,
            name
        })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChatList);