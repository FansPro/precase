import React, { Component } from "react";
import configureStore  from "./src/store/configureStore";
import { AppNavigator } from "./src/navigation/index";
import { Provider } from "react-redux";
import { MenuProvider } from 'react-native-popup-menu';
import { connect} from "react-redux";
import { createReduxContainer } from "react-navigation-redux-helpers";


const stores = configureStore();
const AppContainer = createReduxContainer(AppNavigator, "root");
function mapStateToProps(state) {
    const { nav } = state;
    return {
        state: nav
    }
}
const HigherAppContainer = connect(mapStateToProps)(AppContainer)

class App extends Component {
    constructor(props) {
        super(props);
        console.log("oooo", props);
    }
    componentDidMount() {

    }


    render() {
        return <Provider store={stores}>
            <MenuProvider>
                <HigherAppContainer/>
            </MenuProvider>
        </Provider>
    }
}



export default App;