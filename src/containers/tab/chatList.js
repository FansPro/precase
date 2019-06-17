import React, { Component } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ImageBackground, Platform, NativeModules,
} from "react-native"
import { connect } from "react-redux";
import * as types from "../../common/actionType";
import XMPP from "react-native-xmpp";
import ChatCell from "../../components/chat/chatCell";
import Swipeout from "react-native-swipeout";
import List from "../../components/common/list";
import NavBar from "../../components/common/navBar";
import chatListStyle from "../../style/chat/chatListStyle";
import DB from "../../utils/storage";
import avator from "../../../assets/img/avator_01.jpeg";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    MenuProvider,
    renderers
} from 'react-native-popup-menu';
import chatCellStyle from "../../style/chat/chatCellStyle";
import ChatDao from "../../realm/ChatDao";
import IMUI from 'aurora-imui-react-native'
const AuroraIController = IMUI.AuroraIMUIController;

const DecodeAudioManager = NativeModules.DecodeAudioManager;
const Popover = renderers.Popover;

var themsgid = 1
function constructNormalMessage() {

    var message = {}
    message.msgId = themsgid.toString()
    themsgid += 1
    message.status = "send_succeed"
    message.isOutgoing = true;
    // var date = new Date()
    // message.timeString = date.getHours() + ":" + date.getMinutes()
    var user = {
        userId: "",
        displayName: "replace your nickname",
        avatarPath: "images"
    }
    if (Platform.OS === "ios") {
        user.avatarPath = RNFS.MainBundlePath + '/default_header.png'
    }
    message.fromUser = user

    return message
}


class ChatList extends Component {
    constructor(props) {
        super(props);

        this.state ={
            isLogin: false,
            receiveMsg: "",
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
        this.setState({receiveMsg: body})
        // this.conversation.unshift({own:false, text:body});
    }

    goChatRoom = (item) => {
        this.props.navigation.navigate("chatRoom", { name: item.item.get("name") });
        this.props.getMessages(item.item.get("name"));
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
        ];

        let unReadNum = item.item.get("unReadNum");
        return  <View style={{height: 70, width: "100%", display: "flex", flexDirection:"row", alignItems: "center"}}>
            <View style={{paddingRight: 10,}}>
                <ImageBackground source={{uri: item.item.get("avatarPath")}} style={{...chatCellStyle.cell_avator, marginLeft: 15}}>
                    { unReadNum > 0 && <View style={chatCellStyle.cell_point}>
                        <Text style={chatCellStyle.cell_point_txt} >{ unReadNum > 99 ? "99+" : unReadNum }</Text>
                    </View>}
                </ImageBackground>
            </View>
            <Swipeout style={{flex: 1}} right={btns} key={item.index + item.item.get("name")}>
                <TouchableOpacity onPress={() => this.goChatRoom(item)}>
                    <ChatCell unReadNum={item.item.get("unReadNum")} name={item.item.get("name")} message={item.item.get("message")}/>
                </TouchableOpacity>
            </Swipeout>
        </View>
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
                <Text>{this.state.receiveMsg}</Text>
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
            let jsonMessage = JSON.parse(message);
            var msg = constructNormalMessage()
            msg.msgType = jsonMessage.msgType;
            if (jsonMessage.msgType === "voice") {
                console.log("mememmememe", DecodeAudioManager.decodeAudio(jsonMessage.mediaPath));
                msg.mediaPath = await DecodeAudioManager.decodeAudio(jsonMessage.mediaPath);

            } else {
                msg.mediaPath = jsonMessage.mediaPath ? jsonMessage.mediaPath : null;
            }
            msg.duration = jsonMessage.duration ? jsonMessage.duration : null;
            msg.id = new Date().toTimeString();
            msg.text = jsonMessage.text ? jsonMessage.text : null;
            msg.isOutgoing = false;
            msg.fromUser = jsonMessage.fromUser;
            console.log("mediaPath", msg.mediaPath);
            AuroraIController.appendMessages([msg]);
            dispatch({
                type: types.XMPP_RECEIVE_MESSAGE,
                message,
                name,
            })
        },
        getChatList: async (name, id) => {
            let rs = ChatDao.getAllChatList();
            dispatch({
                type: types.CHAT_GET_CHATLIST,
                chatList: rs.length > 0 ? rs : null,
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
        getMessages: async (name) => {
            let messages = await ChatDao.getMessages(name);
            dispatch({
                type: types.CHAT_MESSAGES,
                messages: messages,
            })
        }

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChatList);