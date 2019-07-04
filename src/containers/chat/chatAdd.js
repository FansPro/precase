import React, { Component } from "react";
import {
    View,
    Text,
    TextInput,
} from "react-native";
import NavBar from "../../components/common/navBar";
import chatAddStyle from "../../style/chat/chatAddStyle";
import { connect } from "react-redux";
import * as types from "../../constants/actionType";

class ChatAdd extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name: "",
        }
    }

    inputName = (value) => {
        this.setState({ name: value});
    }
    addChat = () => {
        this.props.navigation.goBack();
        this.state.name.length > 0 && this.props.addChat(this.state.name)
    }
    render() {
        return <View style={chatAddStyle.chatAdd_container}>
            <NavBar
                title={"添加聊天"}
                navigation={this.props.navigation}
                right={<Text style={chatAddStyle.nav_certain}>确定</Text>}
                rightAction={this.addChat}
            />
            <Text style={chatAddStyle.chatAdd_tip}>请输入你要添加的好友</Text>
            <TextInput onChangeText={this.inputName} style={chatAddStyle.chatAdd_input}/>
        </View>
    }
}

function mapStateToProps() {
    return {

    }
}
function mapDispatchToProps(dispatch) {
    return {
        addChat: (name) => dispatch({
            type: types.CHAT_ADD,
            name,
        })
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ChatAdd);