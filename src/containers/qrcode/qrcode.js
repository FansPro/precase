import React, { Component } from "react";
import {
    View,
    Text,
    CameraRoll,
    Alert,
    TouchableOpacity,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import avator  from "../../../assets/img/avator_01.jpeg"
import NavBar from "../../components/common/navBar";
import RNFetchBlob from 'rn-fetch-blob';
import qrcodeStyle from "../../style/qrcode/qrcodeStyle";
import DateUtil from "../../utils/dateUtil";


class Qrcode extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        // this.getDataURL();
    }

    getDataURL = () => {
        this.svg.toDataURL(this.saveToCamera);
    }


    /**
     *
     * @param dataURL
     */
    saveToCamera = (dataURL) => {
        let path = RNFetchBlob.fs.dirs.DocumentDir;
        let fullPath = `${path}/${DateUtil.dateFormat(new Date(), "yyyyMMddhhmmss")}qrcode.png`;
        // Alert.alert(dataURL);
        console.log("QRPath:", fullPath);
       RNFetchBlob.fs.writeFile(fullPath, dataURL,  "base64").then((rs) => {
           // Alert.alert(rs.toString())
            CameraRoll.saveToCameraRoll("file://" + fullPath, "photo").then(rs => {
                Alert.alert("保存成功")
                // 删除临时存储，不做失败处理
                // RNFS.unlink(fullPath);
            }).catch(e => {
                console.log("Error:", e.toString());
            })
       }).catch(e => Alert.alert(e.toString()));
    }
    render() {
        return (
            <View style={{flex: 1}}>
                <NavBar title={"二维码"} {...this.props}/>
                <View style={{flex: 1, display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <QRCode
                        logoSize={40}
                        logo={{uri: "http://b-ssl.duitang.com/uploads/item/201510/08/20151008192345_uPC5U.jpeg"}}
                        value={"9999"}
                        size={200}
                        getRef={c => this.svg = c}
                    />
                    <TouchableOpacity style={qrcodeStyle.qrcode_btn} onPress={this.getDataURL}>
                        <Text style={qrcodeStyle.qrcode_txt}>保存二维码</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
export default Qrcode;