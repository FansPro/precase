import React, { Component } from "react";
import {
    View,
    Text,
} from "react-native";
import * as types from "../../common/actionType"
import { connect } from "react-redux";

class My extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Text>123123123</Text>
                <Text>{this.props.count}</Text>
            </View>
        )
    }

}
function mapStateToProps(state) {
    const { home } = state;
    return {
        count: home.count
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(My);