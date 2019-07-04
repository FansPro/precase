import StyleSheet from "../../utils/sheetStyle";
import {WINDOW_WIDTH} from "../../constants/constants";

const scanStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
    },
    preView: {
        flex: 1,
        display: 'flex',
    },
    scan_tb: {
        flex: 1,
        backgroundColor: "rgba(0,0,0, 0.5)"
    },
    scan_middle: {
        height: WINDOW_WIDTH * 0.6,
        display: "flex",
        flexDirection: "row",
    },
    scan_view: {
        height: WINDOW_WIDTH * 0.6,
        width: WINDOW_WIDTH * 0.6,
        borderWidth: 0.5,
        borderColor: "white",
        alignItems: "center",
    },
    scan_line: {
        height: 2,
        width: WINDOW_WIDTH * 0.6 - 6,
        backgroundColor: "#37b44a"
    }
});
export default scanStyles;