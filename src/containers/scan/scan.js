import React, { Component } from "react";
import {
    View,
    Text,
    Animated,
    Easing,
    Alert
} from "react-native";
import { RNCamera } from "react-native-camera";
import scanStyles from "../../style/scan/sanStyle";
import {WINDOW_WIDTH} from "../../common/constants";
import NavBar from "../../components/common/navBar";
import ImagePicker from "react-native-image-picker";
import LocalBarcodeRecognizer from 'react-native-local-barcode-recognizer';

class Scan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            top: new Animated.Value(0),
            result: "no result"
        }
        this.scanAnimation();
    }

    scanAnimation = () => {
        this.state.top.setValue(0);
        this.animated = Animated.timing(this.state.top, {
            toValue: 1,
            duration: 2500,
            easing: Easing.linear,
        }).start(() => this.scanAnimation());
    }
    scanBarCode = (e) => {
        console.log("scanBarCode", e);
        this.setState({
            result: JSON.stringify(e),
        })
    }
    goPhotos = () => {
        const options = {
            title: '选择图片',
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍照',
            chooseFromLibraryButtonTitle: '选择照片',
            cameraType: 'back',
            mediaType: 'photo',
            videoQuality: 'high',
            durationLimit: 10,
            maxWidth: 300,
            maxHeight: 300,
            quality: 0.8,
            angle: 0,
            allowsEditing: false,
            noData: false,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                // let source = { uri: response.uri };

                // You can also display the image using data:
                let source = response.data ;
                this.decodeLocalCode(source)
            }
        });
    }

    decodeLocalCode = async (source) => {
        let result = await LocalBarcodeRecognizer.decode(source,{codeTypes:['ean13','qr']});
        console.log("decode", result);
        this.setState({
            result: JSON.stringify(result),
        })
    }
    render() {
        return (
            <View style={scanStyles.container}>
                <RNCamera
                    style={scanStyles.preView}
                    type={RNCamera.Constants.Type.back}
                    barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
                    flashMode={RNCamera.Constants.FlashMode.auto}
                    onBarCodeRead={(e) => this.scanBarCode(e)}
                >
                    <NavBar
                        navigation={this.props.navigation}
                        transparent title={"扫一扫"}
                        right={<Text style={{fontSize: 18, color: "white", marginRight: 10}}>相册</Text>}
                        rightAction={() => this.goPhotos()}
                    />
                    <View style={scanStyles.scan_tb}/>
                    <View style={scanStyles.scan_middle}>
                        <View style={scanStyles.scan_tb}/>
                        <View style={scanStyles.scan_view}>
                            <View style={{ position: 'absolute', left: 0, top: 0 }}>
                                <View style={{ height: 3, width: 20, backgroundColor: '#37b44a' }} />
                                <View style={{ height: 20, width: 3, backgroundColor: '#37b44a' }} />
                            </View>
                            <View style={{ position: 'absolute', right: 0, top: 0 }}>
                                <View style={{ height: 3, width: 20, backgroundColor: '#37b44a' }} />
                                <View style={{ height: 20, width: 3, backgroundColor: '#37b44a', marginRight: 0, marginLeft: "auto" }} />
                            </View>
                            <View style={{ position: 'absolute', left: 0, bottom: 0 }}>
                                <View style={{ height: 20, width: 3, backgroundColor: '#37b44a' }} />
                                <View style={{ height: 3, width: 20, backgroundColor: '#37b44a' }} />
                            </View>
                            <View style={{ position: 'absolute', right: 0, bottom: 0 }}>
                                <View style={{ height: 20, width: 3, backgroundColor: '#37b44a',marginRight: 0, marginLeft: "auto" }} />
                                <View style={{ height: 3, width: 20, backgroundColor: '#37b44a' }} />
                            </View>
                            <Animated.View style={{
                                ...scanStyles.scan_line,
                                transform: [{
                                    translateY: this.state.top.interpolate({
                                        inputRange: [0,  1],
                                        outputRange: [0, WINDOW_WIDTH * 0.6]
                                    })
                                }]
                            }}></Animated.View>
                        </View>
                        <View style={scanStyles.scan_tb}/>
                    </View>

                    <View style={scanStyles.scan_tb}>
                        <Text style={{fontSize: 15, color: "red"}}>{this.state.result}</Text>
                    </View>
                </RNCamera>
            </View>
        )
    }
}
export default Scan;