import React, { Component } from "react";
import configureStore  from "./src/store/configureStore";
import { AppContainer } from "./src/navigation/index";
import { Provider } from "react-redux";
import { MenuProvider } from 'react-native-popup-menu';

const stores = configureStore();
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
                <AppContainer/>
            </MenuProvider>
        </Provider>
    }
}
export default App;