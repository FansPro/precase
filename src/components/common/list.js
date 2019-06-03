import React, { Component } from "react";
import {
    FlatList,
    View,
} from "react-native";

class List extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <FlatList
            renderItem={ (item) => this.props.renderCell(item) }
            keyExtractor={(item, index) => index}
        />
    }
}
export default List;