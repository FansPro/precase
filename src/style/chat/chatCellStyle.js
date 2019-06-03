import StyleSheet from "../../utils/sheetStyle";

const chatCellStyle = StyleSheet.create({
    cell_content: {
        height: 60,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 10,
        width: "100%",
        backgroundColor: "red",
        paddingRight: 10,
    },
    cell_avator: {
        height: 40,
        width: 40,
        backgroundColor: "#999999",
        borderRadius: 4,
    },
    cell_line: {
        marginLeft: 60,
        height: 1,
        backgroundColor: "#999999",
    }
});
export default chatCellStyle;