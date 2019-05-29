import {
    StatusBar,
    Platform,
} from "react-native";
import StyleSheet from "../../utils/sheetStyle";


const navBarStyles  = StyleSheet.create({
    container: {
        android: {
            height: StatusBar.currentHeight + 46,
        }

    }
});
export default navBarStyles;