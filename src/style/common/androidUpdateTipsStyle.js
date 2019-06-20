import StyleSheet from "../../utils/sheetStyle";

const androidUpdateTipsStyle = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.4)",
    },
    content: {
        width: "60%",
        paddingTop: 15,
        borderRadius: 4,
        backgroundColor: "white",
        display: "flex",
        alignItems: "center",
        overflow: "hidden"
    },
    update_title: {
        fontSize: 18,
        color: "#222222",
    },
    update_tips: {
        width: "100%",
        display: "flex",
        alignItems: "flex-start",
        padding: 15,
    },
    update_tip: {
        color: "#222",
        fontSize: 16,
        textAlign: "left",
    },
    update_line: {
        height: 1,
        backgroundColor: "#f6f6f6",
        width: "100%",
    },
    update_btns: {
        display: "flex",
        flexDirection: "row",
        height: 45,
        width: "100%",
    },
    update_btn: {
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    update_left_text: {
        color: "#444",
        fontSize: 16,
        fontWeight: "bold",
    },
    update_right_text: {
        color: "#4D78B0",
        fontSize: 16,
        fontWeight: "bold",
    },
    update_btn_line: {
        height: 45,
        width: 1,
        backgroundColor: "#f6f6f6",
    },
    update_progress: {
        height: 4,
        width: "100%",
        display: "flex",
        backgroundColor: "#f6f6f6",
        borderRadius: 2,
    },
    update_progress_per: {
        height: 4,
        borderRadius: 2,
        backgroundColor: "#4D78B0"
    },
    update_btn_cancel: {
        color: "red",
        fontSize: 16,
        fontWeight: "bold",
    }
})
export default androidUpdateTipsStyle;