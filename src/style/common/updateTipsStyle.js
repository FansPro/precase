import StyleSheet from "../../utils/sheetStyle";

const updateTipStyle = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: -50,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0,0, 0.4)"
    },
    content: {
        width: "80%",
        paddingBottom: 15,
        paddingTop: 15,
        backgroundColor: "white",
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
    },
    up_title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000000",
    },
    up_detail: {
        fontSize: 14,
        color: "#444444",
        marginTop: 15,
    }
});
export default updateTipStyle;