import StyleSheet from "../../utils/sheetStyle";

const chatListStyle = StyleSheet.create({
    nav_right: {
        fontSize: 28,
        color: "white",
        marginRight: 15,
    },
    chat_tip: {
        width: "100%",
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: "#999",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    chat_logTxt: {
        color: "red",
        fontSize: 13,
    }
})
export default chatListStyle;