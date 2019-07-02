import StyleSheet from "../../utils/sheetStyle";

const bottomNavStyle = StyleSheet.create({
    container: {
        height: 50,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        backgroundColor: "white",
        borderTopColor: "#605F60",
        borderTopWidth: 0.5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.8,
        shadowRadius: 6,
        elevation: 10
    },
    nav_item: {
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    nav_item_content: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    nav_image: {
        height: 28,
        width: 28,
    },
    nav_text: {
        fontSize: 10,
        color: "#999999",
        marginTop: 3,
    },
    nav_text_tint: {
        fontSize: 10,
        color: "#626afd",
        marginTop: 3,
    },
    nav_point: {
        height: 12,
        width: 12,
        backgroundColor: "red",
        borderRadius: 6,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: -3,
        right: -3,
    },
    nav_msg: {
        fontSize: 10,
        color: "white",
    }
})

export default bottomNavStyle;