import React, { Component } from "react";
import {
    View,
    Modal,
    Text,
} from "react-native";
import updateTipStyle from "../../style/common/updateTipsStyle";


class UpdateTips extends Component {
    render() {
        return (
            <View style={updateTipStyle.container}>
                <View style={updateTipStyle.content}>
                    <Text style={updateTipStyle.up_title}>更新提示</Text>
                    <Text style={updateTipStyle.up_detail}>应用正在升级中，请耐心等候</Text>
                </View>
            </View>
        )

    }
}

export default UpdateTips;