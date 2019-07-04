import StyleSheet from "../../utils/sheetStyle";
import {WINDOW_WIDTH} from "../../constants/constants";

const payTipsStyle = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0, 0.4)",
        flex: 1,
    },
    content: {
        width: "80%",
        padding: 15,
        borderRadius: 8,
        backgroundColor: "white",
    },
    input_content: {
        backgroundColor: "#999",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 1,
    },
    input_children: {
        flex: 1,
        backgroundColor: "white",
        height: ((WINDOW_WIDTH * 0.8) - 35 ) / 6.0 ,
        fontSize: 18,
        fontWeight: "bold",
        color: "#222222",
        textAlign: "center",
    },
    input_sub: {
        height: ((WINDOW_WIDTH * 0.8) - 35 ) / 6.0 ,
        zIndex:1000,
        position: "absolute",
        top:0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0,
    },
    pt_header: {
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
    },
    pt_title: {
        fontSize: 18,
        color: "#222",
        fontWeight: "bold",
    }
});
export default payTipsStyle;