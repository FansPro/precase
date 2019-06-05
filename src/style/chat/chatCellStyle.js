import StyleSheet from "../../utils/sheetStyle";

const chatCellStyle = StyleSheet.create({
    cell_content: {
        height: 70,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 10,
        width: "100%",
        paddingRight: 10,
        backgroundColor: "white",
    },
    cell_avator: {
        height: 50,
        width: 50,
        backgroundColor: "#999999",
        borderRadius: 4,
    },
    cell_point: {
        height:14,
        minWidth: 14,
        borderRadius: 7,
        backgroundColor:"red",
        marginTop: -5,
        marginRight: -5,
        marginLeft:"auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    cell_point_txt: {
        color: "white",
        textAlign: "center",
        paddingLeft:2,
        paddingRight: 2,
        fontSize:10,
    },

    cell_info: {
        height: 50,
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