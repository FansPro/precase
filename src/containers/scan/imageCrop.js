import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Alert
} from "react-native";
import NavBar from "../../components/common/navBar";
import qrcodeStyle from "../../style/qrcode/qrcodeStyle";
import ImagePicker from "react-native-image-crop-picker";


class ImageCrop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
        }
    }
    cropImage = () => {
        ImagePicker.openPicker({
            width: 200,
            height: 200,
            cropping: true,
            includeBase64: true,
            hideBottomControls : true,

        }).then(image => {
            Alert.alert(image.data)
            this.setState({image: `data:${image.mime};base64,${image.data}`});
        })
    }
   render() {
        return (
            <View style={{flex: 1}}>
                <NavBar title="图片编辑" {...this.props}/>
                <View style={{flex: 1, display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <TouchableOpacity style={qrcodeStyle.qrcode_btn} onPress={this.cropImage}>
                        <Text style={qrcodeStyle.qrcode_txt}>编辑图片</Text>
                    </TouchableOpacity>
                    <Image style={{height: 200, width: 200, backgroundColor: "#f6f6f6", marginTop: 20}} source={{uri: this.state.image}}/>
                </View>
            </View>
        )
    }
}
export default ImageCrop;