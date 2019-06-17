import {
    StatusBar,
    Platform,
} from "react-native";
import StyleSheet from "../../utils/sheetStyle";


const navBarStyles  = StyleSheet.create({
    container: {
        marginTop: 0,
        android: {
            height: StatusBar.currentHeight + 46,
        },
        ios: {
            height: 64,
        },
        backgroundColor: "#4D78B0",
        zIndex: 10000000,
    },
    content: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        marginTop: StatusBar.currentHeight,
    },
    content_bar: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    content_title: {
        color: "white",
        fontSize: 18,
    },
    loading: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    loading_txt: {
        marginLeft:5,
        color: "white",
        fontSize: 18,
    }

});
export default navBarStyles;