import React, { Component } from "react";
import {
    FlatList,
    View,
} from "react-native";

class List extends Component {
    constructor(props) {
        super(props);
    }
    shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean {
        if(nextProps.ds) {
            return true;
        }
        return false;
    }

    render() {
        return <FlatList
            style={{flex:1}}
            renderItem={ (item) => this.props.renderCell(item) }
            keyExtractor={(item, index) => `${index}chatlist`}
            data={this.props.ds}
        />
    }
}
export default List;