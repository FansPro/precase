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
import chatListStyle from "../../style/chat/chatListStyle";
import DB from "../../utils/storage";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    MenuProvider,
    renderers
} from 'react-native-popup-menu';

const Popover = renderers.Popover;


class ChatList extends Component {
    constructor(props) {
        super(props);

        this.state ={
            isLogin: false,
        };
        XMPP.on('message', this.onReceiveMessage);
        XMPP.on('iq', this.onIQBack);
        XMPP.on('presence', (message) => console.log('PRESENCE:' + JSON.stringify(message)));
        XMPP.on('error', (message) => console.log('ERROR:' + message));
        XMPP.on('loginError', (message) => console.log('LOGIN ERROR:' + message));
        XMPP.on('login', (message) => this.setState({isLogin: true}));
        XMPP.on('connect', (message) => console.log('CONNECTED!'));
        XMPP.on('disconnect', (message) => console.log('DISCONNECTED!'));
        XMPP.on('error', (message) => console.log("error", message))
        this.props.logIn();
        this.props.getChatList();
    }
    onIQBack = (message) => {
        console.log("onIQBack", message, message.query);
        if (message.query) {
            console.log("jid", message.query.item.jid);
            var name = message.query.item.jid.match(/^([^@]*)@/)[1];
            // this.props.getChatList(name, message.id);
        }
    }
    onReceiveMessage = ({from, body}) => {
        console.log("onReceiveMessage", from, body);
        // extract username from XMPP UID
        if (!from || !body){
            return;
        }
        var name = from.match(/^([^@]*)@/)[1];
        console.log("receive",from, body, name);
        this.props.receiveMessage(name, body);
        // this.conversation.unshift({own:false, text:body});
    }

    goChatRoom = (item) => {
        this.props.navigation.navigate("chatRoom", { name: item.item.get("name") });
        this.props.goChatRoom(item.item.get("name"));
    }
    renderCell = (item) => {

        var btns = [
            {
                text: "置顶",

            },
            {
                text: '删除',
                onPress: () => {
                    this.props.doDeleteChat(item.item.get("name"));
                },
                backgroundColor: "red",
            }
        ]
        return  <Swipeout right={btns} key={item.index + item.item.get("name")}>
            <TouchableOpacity onPress={() => this.goChatRoom(item)}>
                <ChatCell unReadNum={item.item.get("unReadNum")} name={item.item.get("name")} message={item.item.get("message")}/>
            </TouchableOpacity>
        </Swipeout>
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <NavBar left={true} title={"消息"} right={<View>
                    <Menu  renderer={Popover} rendererProps={{ placement: 'bottom' }}>
                        <MenuTrigger  >
                            <Text style={{color: "white", fontSize: 28, marginRight: 10}}>+</Text>
                        </MenuTrigger>
                        <MenuOptions style={{padding: 5, backgroundColor: "#444444", borderRadius: 4}}>
                            <MenuOption onSelect={()=> this.props.navigation.navigate("chatAdd")}>
                                <Text style={{color: "white"}}>添加好友</Text>
                            </MenuOption>
                        </MenuOptions>
                    </Menu>
                </View>}/>
                {!this.state.isLogin && <View style={chatListStyle.chat_tip}>
                    <Text style={chatListStyle.chat_logTxt}>正在连接中...</Text>
                </View>}
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
        receiveMessage: async (name, message) => {
            let rs = await DB.get("chatList");
            dispatch({
                type: types.XMPP_RECEIVE_MESSAGE,
                message,
                name,
                chatList: rs,
            })
        },
        getChatList: async (name, id) => {
            let rs = await DB.get("chatList");
            dispatch({
                type: types.CHAT_GET_CHATLIST,
                name,
                id,
                chatList: rs,
            })
        },
        goChatRoom: (name) => dispatch({
            type: types.CHAT_GO_ROOM,
            isChatList: false,
            name: name,
        }),
        doDeleteChat: (name) => dispatch({
            type: types.CHAT_DELETE_CELL,
            name,
        }),
        addOneChat: () => dispatch({
            type: types.CHAT_ADD_ONE,
        })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChatList);