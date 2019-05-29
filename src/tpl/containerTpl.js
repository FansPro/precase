import React, { Component } from "react";
import {
    View,
    Text,
} from "react-native";

class Foo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Text>this is Foo Page</Text>
            </View>
        )
    }

}
export default Foo;