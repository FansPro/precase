import {
    StatusBar,
    Platform,
} from "react-native";
import StyleSheet from "../../utils/sheetStyle";
import DeviceInfo from "../../utils/deviceInfo";



const navBarStyles  = StyleSheet.create({
    container: {
        android: {
            height: StatusBar.currentHeight + 46,
        },
        ios: {
            height:  DeviceInfo.isIphoneX ? 88 : 64,
            marginTop: DeviceInfo.isIphoneX ? -44 : 0,
        },
        backgroundColor: "#4D78B0",
        zIndex: 10000000,
    },
    content: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        android: {
            marginTop: StatusBar.currentHeight,
        },
        ios: {
          marginTop: DeviceInfo.isIphoneX ? 44 : 20,
        }

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