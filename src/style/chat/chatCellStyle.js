import StyleSheet from "../../utils/sheetStyle";

const chatCellStyle = StyleSheet.create({
    cell_content: {
        height: 60,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 10,
        width: "100%",
        paddingRight: 10,
        backgroundColor: "white",
    },
    cell_avator: {
        height: 40,
        width: 40,
        backgroundColor: "#999999",
        borderRadius: 4,
    },
    cell_info: {
        height: 40,
        marginLeft: 10,
        display: "flex",
        justifyContent: "space-between",
    },
    cell_info_name: {
        fontSize: 16,
        color: "black",
    },
    cell_info_msg: {
        fontSize: 14,
        color: "#999999",
    },
    cell_line: {
        marginLeft: 60,
        height: 1,
        backgroundColor: "#999999",
    }
});
export default chatCellStyle;