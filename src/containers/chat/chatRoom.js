import React, { Component } from 'react'

import {
    StyleSheet,
    View,
    Alert,
    Dimensions,
    Button,
    Platform,
    Image,
    NativeModules,
} from 'react-native'
import { connect } from "react-redux";
import * as types from "../../common/actionType";
var RNFS = require('react-native-fs')

var ReactNative = require('react-native')
import IMUI from "aurora-imui-react-native"
var InputView = IMUI.ChatInput
var MessageListView = IMUI.MessageList
const AuroraIController = IMUI.AuroraIMUIController
const window = Dimensions.get('window');
import NavBar from "../../components/common/navBar";
import ChatDao from "../../realm/ChatDao"
const DecodeAudioManager = NativeModules.DecodeAudioManager;



var themsgid = 1

function constructNormalMessage() {

    var message = {}
    message.msgId = themsgid.toString()
    themsgid += 1
    message.status = "send_succeed"
    message.isOutgoing = true
    var date = new Date()
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


class CustomVew extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (<img src={`${RNFS.MainBundlePath}/default_header.png`}></img>)
    }
}

class ChatRoom extends Component {
    constructor(props) {
        super(props);
        let initHeight;
        if (Platform.OS === "ios") {
            initHeight = 46
        } else {
            initHeight = 100
        }
        this.state = {
            inputLayoutHeight: initHeight,
            messageListLayout: { flex: 1, width: window.width, margin: 0 },
            inputViewLayout: { width: window.width, height: initHeight, },
            isAllowPullToRefresh: true,
            navigationBar: {},
            refresh: true,
        }


        this.updateLayout = this.updateLayout.bind(this);
        this.onMsgClick = this.onMsgClick.bind(this);
        this.messageListDidLoadEvent = this.messageListDidLoadEvent.bind(this);
    }

    componentDidMount() {
        /**
         * Android only
         * Must set menu height once, the height should be equals with the soft keyboard height so that the widget won't flash.
         * 在别的界面计算一次软键盘的高度，然后初始化一次菜单栏高度，如果用户唤起了软键盘，则之后会自动计算高度。
         */
        if (Platform.OS === "android") {
            this.refs["ChatInput"].setMenuContainerHeight(316)
        }
        this.resetMenu()
        AuroraIController.addMessageListDidLoadListener(this.messageListDidLoadEvent);
    }

    messageListDidLoadEvent() {
        this.getHistoryMessage()
    }

    getHistoryMessage() {
        var tmpmessages = [];
        const { messages } = this.props;
        const name = this.props.navigation.state.params.name;
        messages.map(async msg => {

            var message = constructNormalMessage()
            message.fromUser = msg.get("fromUser").toJSON();
            message.msgType = msg.get("msgType");
            message.text = msg.get("text");
            message.duration = msg.get("duration");
            message.isOutgoing = name === msg.get("fromUser").get("displayName") ? false : true;
            if (msg.get("msgType") !== "text") {
                if (msg.get("msgType") === "voice") {
                    let path = msg.get("mediaPath");
                    message.mediaPath = msg.get("voicePath");
                } else {
                    message.mediaPath =  msg.get("mediaPath");

                }
            }
            tmpmessages.push(message);
        });
        AuroraIController.appendMessages(tmpmessages);
        AuroraIController.scrollToBottom(true);
        // for (var i = 0; i < 10; i++) {
        //   var message = constructNormalMessage()
        //   message.msgType = 'custom'

        //   if (Platform.OS === "ios") {
        //     message.content = `
        //     <h5>This is a custom message. </h5>
        //     <img src="file://${RNFS.MainBundlePath}/default_header.png"/>
        //     `
        //   } else {
        //     message.content = '<body bgcolor="#ff3399"><h5>This is a custom message. </h5>\
        //     <img src="/storage/emulated/0/XhsEmoticonsKeyboard/Emoticons/wxemoticons/icon_040_cover.png"></img></body>'
        //   }

        //   var eventMessage = constructNormalMessage()
        //   eventMessage.msgType = "event"
        //   eventMessage.text = 'fsadfad'

        //   message.contentSize = { 'height': 100, 'width': 200 }
        //   message.extras = { "extras": "fdfsf" }
        //   AuroraIController.appendMessages([message, eventMessage])
        //   AuroraIController.scrollToBottom(true)
        // }
    }

    onInputViewSizeChange = (size) => {
        console.log("onInputViewSizeChange height: " + size.height + " width: " + size.width)
        if (this.state.inputLayoutHeight != size.height) {
            this.setState({
                inputLayoutHeight: size.height,
                inputViewLayout: { width: window.width, height: size.height },
                messageListLayout: { flex: 1, width: window.width, margin: 0 }
            })
        }
    }

    componentWillUnmount() {
        AuroraIController.removeMessageListDidLoadListener(this.messageListDidLoadEvent)
    }

    resetMenu() {
        if (Platform.OS === "android") {
            this.refs["ChatInput"].showMenu(false)
            this.setState({
                messageListLayout: { flex: 1, width: window.width, margin: 0 },
                navigationBar: { height: 64, justifyContent: 'center' },
            })
            this.forceUpdate();
        } else {
            AuroraIController.hidenFeatureView(true)
        }
    }

    /**
     * Android need this event to invoke onSizeChanged
     */
    onTouchEditText = () => {
        this.refs["ChatInput"].showMenu(false)
    }

    onFullScreen = () => {
        console.log("on full screen")
        this.setState({
            messageListLayout: { flex: 0, width: 0, height: 0 },
            inputViewLayout: { flex: 1, width: window.width, height: window.height },
            navigationBar: { height: 0 }
        })
    }

    onRecoverScreen = () => {
        // this.setState({
        //   inputLayoutHeight: 100,
        //   messageListLayout: { flex: 1, width: window.width, margin: 0 },
        //   inputViewLayout: { flex: 0, width: window.width, height: 100 },
        //   navigationBar: { height: 64, justifyContent: 'center' }
        // })
    }

    onAvatarClick = (message) => {
        // Alert.alert()
        // AuroraIController.removeMessage(message.msgId)
    }

    onMsgClick(message) {
        // console.log(message)
        // if(message.msgType !== "text") {
        //     Alert.alert("message", JSON.stringify(message))
        // }
    }

    onMsgLongClick = (message) => {
        Alert.alert('message bubble on long press', 'message bubble on long press')
    }

    onStatusViewClick = (message) => {
        message.status = 'send_succeed'
        AuroraIController.updateMessage(message)
    }

    onBeginDragMessageList = () => {
        this.resetMenu()
        AuroraIController.hidenFeatureView(true)
    }

    onTouchMsgList = () => {
        AuroraIController.hidenFeatureView(true)
    }


    onPullToRefresh = () => {
        console.log("on pull to refresh")
        if(this.state.refresh) {
            const name = this.props.navigation.state.params.name;
            var messages = [];
            ChatDao.getOldMessages(name).map(item => {
                console.log("chat", item);
                var message = constructNormalMessage()
                message.msgType = item.msgType;
                message.fromUser = { ...item.fromUser};
                message.text = item.text;
                message.duration = item.duration;
                message.isOutgoing = name === item.fromUser.displayName ? false : true;
                if (item.msgType !== "text") {
                    if (item.msgType === "voice") {
                        message.mediaPath = item.voicePath;
                    } else {
                        message.mediaPath =  item.mediaPath;

                    }
                }
                messages.push(message);
                this.setState({refresh: false});
            })

            AuroraIController.insertMessagesToTop(messages)

        }
        if (Platform.OS === 'android') {
            this.refs["MessageList"].refreshComplete()
        }

    }

    onSendText = (text) => {
        const { sendMessage, user } = this.props;

        let message = constructNormalMessage()
        message.msgType = 'text'
        message.text = text;
        message.fromUser = user.toJSON();
        const name = this.props.navigation.state.params.name;

        sendMessage(message, name);
        AuroraIController.appendMessages([message])
    }

    onTakePicture = (media) => {
        console.log("media " + JSON.stringify(media))
        const { sendMessage, user } = this.props;
        const name = this.props.navigation.state.params.name;

        let message = constructNormalMessage()
        message.msgType = 'image'
        message.fromUser = user.toJSON();
        RNFS.readFile(media.mediaPath, 'base64').then(rs => {
            let subbfix = media.mediaPath.substring(media.mediaPath.lastIndexOf('.') + 1, media.mediaPath.length);
            message.mediaPath = `data:image/${subbfix};base64,${rs}`;
            AuroraIController.appendMessages([message])
            this.resetMenu()
            sendMessage(message, name);
            AuroraIController.scrollToBottom(true)
        })


    }

    onStartRecordVoice = (e) => {
        console.log("on start record voice")
    }

    onFinishRecordVoice = (mediaPath, duration) => {

        const { sendMessage, user } = this.props;
        const name = this.props.navigation.state.params.name;

        let message = constructNormalMessage()
        message.msgType = "voice"
        message.duration = duration
        message.fromUser = user.toJSON();
        RNFS.readFile(mediaPath, "base64").then(rs => {
            message.mediaPath = 'data:audio/m4a;base64,' + rs;
            sendMessage(message, name)
            message.mediaPath = mediaPath;
            AuroraIController.appendMessages([message])
        })

        console.log("on finish record voice")
    }




    onStartRecordVideo = () => {
        console.log("on start record video")
    }

    onFinishRecordVideo = (video) => {
        // var message = constructNormalMessage()

        // message.msgType = "video"
        // message.mediaPath = video.mediaPath
        // message.duration = video.duration
        // AuroraIController.appendMessages([message])
    }

    onSendGalleryFiles = (mediaFiles) => {
        const { sendMessage, user } = this.props;
        /**
         * WARN: This callback will return original image,
         * if insert it directly will high memory usage and blocking UI。
         * You should crop the picture before insert to messageList。
         *
         * WARN: 这里返回的是原图，直接插入大会话列表会很大且耗内存.
         * 应该做裁剪操作后再插入到 messageListView 中，
         * 一般的 IM SDK 会提供裁剪操作，或者开发者手动进行裁剪。
         *
         * 代码用例不做裁剪操作。
         */
        // Alert.alert('fas', JSON.stringify(mediaFiles))
        for (index in mediaFiles) {


            var message = constructNormalMessage()
            if (mediaFiles[index].mediaType == "image") {
                message.msgType = "image"
            } else {
                message.msgType = "video"
                message.duration = mediaFiles[index].duration
            }
            message.fromUser = user.toJSON();
            console.log("mediaFile", mediaFiles[index].size / 1024);
            const { name } = this.props.navigation.state.params;
            let mediaPath =  mediaFiles[index].mediaPath;
            let mediaFile = mediaFiles[index];

            AuroraIController.scaleImage({path: mediaPath, width: 750, height: mediaFile.height * 750 / mediaFile.width }, (result) => {
                console.log("compress", result.thumbPath ? result.thumbPath : mediaPath);
                RNFS.readFile(result.thumbPath ? result.thumbPath : mediaPath, "base64").then(rs => {

                    let subbfix = mediaPath.substring(mediaPath.lastIndexOf('.') + 1, mediaPath.length);
                    message.mediaPath = `data:image/${subbfix};base64,${rs}`;

                    sendMessage(message, name)
                    AuroraIController.appendMessages([message])
                    AuroraIController.scrollToBottom(true)
                    this.resetMenu()
                })
            });


            // message.timeString = "8:00"
            // message.status = "send_going"

        }


    }

    onSwitchToMicrophoneMode = () => {
        AuroraIController.scrollToBottom(true)
    }

    onSwitchToEmojiMode = () => {
        AuroraIController.scrollToBottom(true)
    }
    onSwitchToGalleryMode = () => {
        AuroraIController.scrollToBottom(true)
    }

    onSwitchToCameraMode = () => {
        AuroraIController.scrollToBottom(true)
    }

    onShowKeyboard = (keyboard_height) => {
    }

    updateLayout(layout) {
        this.setState({ inputViewLayout: layout })
    }

    onInitPress() {
        console.log('on click init push ');
        this.updateAction();
    }

    onClickSelectAlbum = () => {
        console.log("on click select album")
    }

    onCloseCamera = () => {
        console.log("On close camera event")
        this.setState({
            inputLayoutHeight: 100,
            messageListLayout: { flex: 1, width: window.width, margin: 0 },
            inputViewLayout: { flex: 0, width: window.width, height: 100 },
            navigationBar: { height: 64, justifyContent: 'center' }
        })
    }

    /**
     * Switch to record video mode or not
     */
    switchCameraMode = (isRecordVideoMode) => {
        console.log("Switching camera mode: isRecordVideoMode: " + isRecordVideoMode)
        // If record video mode, then set to full screen.
        if (isRecordVideoMode) {
            this.setState({
                messageListLayout: { flex: 0, width: 0, height: 0 },
                inputViewLayout: { flex: 1, width: window.width, height: window.height },
                navigationBar: { height: 0 }
            })
        }
    }

    goBack = () => {
        this.props.navigation.pop();
        this.props.goChatList();
    }

    render() {
        const { name } = this.props.navigation.state.params;
        return (
            <View style={styles.container}>
                <View style={{flex: 1}}>
                    <NavBar leftAction={this.goBack} title={name} navigation={this.props.navigation}/>
                    <MessageListView style={this.state.messageListLayout}
                                     ref="MessageList"
                                     isAllowPullToRefresh={true}
                                     onAvatarClick={this.onAvatarClick}
                                     onMsgClick={this.onMsgClick}
                                     onStatusViewClick={this.onStatusViewClick}
                                     onTouchMsgList={this.onTouchMsgList}
                                     onTapMessageCell={this.onTapMessageCell}
                                     onBeginDragMessageList={this.onBeginDragMessageList}
                                     onPullToRefresh={this.onPullToRefresh}
                                     avatarSize={{ width: 50, height: 50 }}
                                     avatarCornerRadius={25}
                                     messageListBackgroundColor={"#f3f3f3"}
                                     sendBubbleTextSize={18}
                                     sendBubbleTextColor={"#000000"}
                                     sendBubblePadding={{ left: 10, top: 5, right: 15, bottom: 5 }}
                                     datePadding={{ left: 5, top: 5, right: 5, bottom: 5 }}
                                     dateBackgroundColor={"#F3F3F3"}
                                     photoMessageRadius={5}
                                     maxBubbleWidth={0.7}
                                     videoDurationTextColor={"#ffffff"}
                    />
                    <InputView style={this.state.inputViewLayout}
                               ref="ChatInput"
                               onSendText={this.onSendText}
                               onTakePicture={this.onTakePicture}
                               onStartRecordVoice={this.onStartRecordVoice}
                               onFinishRecordVoice={this.onFinishRecordVoice}
                               onCancelRecordVoice={this.onCancelRecordVoice}
                               onStartRecordVideo={this.onStartRecordVideo}
                               onFinishRecordVideo={this.onFinishRecordVideo}
                               onSendGalleryFiles={this.onSendGalleryFiles}
                               onSwitchToEmojiMode={this.onSwitchToEmojiMode}
                               onSwitchToMicrophoneMode={this.onSwitchToMicrophoneMode}
                               onSwitchToGalleryMode={this.onSwitchToGalleryMode}
                               onSwitchToCameraMode={this.onSwitchToCameraMode}
                               onShowKeyboard={this.onShowKeyboard}
                               onTouchEditText={this.onTouchEditText}
                               onFullScreen={this.onFullScreen}
                               onRecoverScreen={this.onRecoverScreen}
                               onSizeChange={this.onInputViewSizeChange}
                               closeCamera={this.onCloseCamera}
                               switchCameraMode={this.switchCameraMode}
                               showSelectAlbumBtn={true}
                               showRecordVideoBtn={false}
                               onClickSelectAlbum={this.onClickSelectAlbum}
                               inputPadding={{ left: 30, top: 10, right: 10, bottom: 10 }}
                               galleryScale={0.6}//default = 0.5
                               compressionQuality={0.6}
                               cameraQuality={0.7}//default = 0.5
                               customLayoutItems={{
                                   left: [],
                                   right: ['send'],
                                   bottom: ['voice','gallery','emoji','camera']
                               }}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    sendCustomBtn: {

    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    inputView: {
        backgroundColor: 'green',
        width: window.width,
        height: 100,
    },
    btnStyle: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#3e83d7',
        borderRadius: 8,
        backgroundColor: '#3e83d7'
    }
});

function mapStateToProps(state) {
    const { xmpp } = state;
    return {
        chatList: xmpp.get("chatList"),
        user: xmpp.get("user"),
        messages: xmpp.get("messages"),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        sendMessage: (message, user) => dispatch({
            type: types.XMPP_SEND_MESSAGE,
            message: message,
            user,
        }),
        goChatList: () => dispatch({
            type: types.CHAT_ROOM_BACK,
        })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);