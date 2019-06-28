import StyleSheet from "../../utils/sheetStyle";

const bottomNavStyle = StyleSheet.create({
    container: {
        height: 50,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        backgroundColor: "red"
    },
    nav_item: {
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    nav_image: {
        height: 28,
        width: 28,
        backgroundColor: "blue",
    },
    nav_text: {
        fontSize: 12,
        color: "#4D78B0",
        marginTop: 3,
    }
})

export default bottomNavStyle;