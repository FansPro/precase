import StyleSheet from "../../utils/sheetStyle";

const qrcodeStyle = StyleSheet.create({
    qrcode_btn: {
        height: 40,
        width: "60%",
        borderRadius: 4,
        marginTop: 20,
        backgroundColor: "#4D78B0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    qrcode_txt: {
        fontSize: 15,
        color: "white",
    },
})
export default qrcodeStyle;