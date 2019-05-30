import React, { Component } from "react";

class BaseComponent extends Component {
    navTo(routeName) {
        this.props.navigation.replace(routeName);
    }
    navPush(routeName) {
        this.props.navigation.navigate(routeName);
    }
    navBack() {
        this.props.navigation.goBack();
    }
}
export default BaseComponent;