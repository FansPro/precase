import React, { PureComponent } from "react";
import {
    View,
    TouchableOpacity,
    Modal,
    Text,
} from "react-native";
import { connect } from "react-redux";

class Loading extends PureComponent {
    render() {
        return (
            <Modal presentationStyle={{position: "absolute", top: 0, left: 0, right: 0, bottom: 0}} visible={this.props.visible}>
                <TouchableOpacity>
                    <View><Text>3123</Text></View>
                </TouchableOpacity>
            </Modal>
        )
    }
}

function mapStateToProps(state) {
    const { app } = state;
    return {
        visible: app.get("loading"),
    }
}
function mapDisPatchToProps(dispatch) {
    return {

    }
}

export default connect(mapStateToProps, mapDisPatchToProps)(Loading);