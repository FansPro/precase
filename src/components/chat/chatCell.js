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
        return <View style={{ backgroundColor: "white"}}>
            <View
                style={chatCellStyle.cell_content}
            >
                <View style={chatCellStyle.cell_avator}/>
                <View style={chatCellStyle.cell_info}>
                    <Text style={chatCellStyle.cell_info_name}>FansX</Text>
                    <Text style={chatCellStyle.cell_info_msg}>今天的阳光真好。</Text>
                </View>
            </View>
            <View style={chatCellStyle.cell_line}></View>
        </View>
    }
}
export default ChatCell;