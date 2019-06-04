import React, { Component } from "react";
import {
    PanResponder,
    View,
    Text,
    Animated,
} from "react-native";
import chatCellStyle from "../../style/chat/chatCellStyle";

class ChatCell extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { name, message, unRead } = this.props;
        return <View style={{ backgroundColor: "white"}}>
            <View
                style={chatCellStyle.cell_content}
            >
                <View style={chatCellStyle.cell_avator}>
                    { unRead && <View style={chatCellStyle.cell_point}/>}
                </View>
                <View style={chatCellStyle.cell_info}>
                    <Text style={chatCellStyle.cell_info_name}>{name}</Text>
                    <Text style={chatCellStyle.cell_info_msg}>{message}</Text>
                </View>
            </View>
            <View style={chatCellStyle.cell_line}></View>
        </View>
    }
}
export default ChatCell;