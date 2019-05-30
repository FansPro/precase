import StyleSheet from "../../utils/sheetStyle";

const homeStyles = StyleSheet.create({
    home_cell: {
        height: 60,
        backgroundColor: "#f6f6f6",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },
    home_cell_txt: {
        color: "red",
        fontSize: 15,
        marginLeft: 15
    }
});
export default homeStyles;