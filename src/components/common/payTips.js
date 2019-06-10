import React, { Component } from "react";
import {
    View,
    Text,
    TextInput,
    Modal,
    TouchableOpacity,
} from "react-native";
import payTipsStyle from "../../style/common/payTips";
import UpdateTips from "./updateTips";

class PayTips extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: true,
        }
        this.state = {
            password: "",
        }
    }
    inputPassword = (text) => {
        console.log("ppsfd", text);
        this.setState({password: text});
    }
    render() {
        const { password } = this.state;
        console.log("fsfa", password);
        return (
            <Modal visible={this.state.modalVisible} transparent={true}>
                <TouchableOpacity onPress={() => this.setState({modalVisible: false})} style={payTipsStyle.container}>
                    <View style={payTipsStyle.content}>
                            <View style={payTipsStyle.pt_header}>
                                <Text style={payTipsStyle.pt_title}>支付密码</Text>
                            </View>
                            {(()=> {
                                let pwdViews = [];
                               for(let i = 0; i < 6; i++) {
                                    pwdViews.push(
                                        <TextInput editable={false} secureTextEntry={true} value={ i < password.length ? password.charAt(i)  : "" } style={{...payTipsStyle.input_children,marginLeft: i === 0 ? 0 :1 }}/>
                                    );
                               }
                               return <View style={payTipsStyle.input_content}>
                                       {pwdViews}
                                   <TextInput onChangeText={this.inputPassword} style={payTipsStyle.input_sub} keyboardType="decimal-pad" maxLength={6} autoFocus={true}/>
                               </View>
                            })()}
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }
}
export default PayTips;