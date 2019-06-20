import React, { Component } from "react";
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    NativeModules
} from "react-native";
import androidUpdateTipsStyle from "../../style/common/androidUpdateTipsStyle";
import RNFetchBlob from "react-native-fetch-blob";
import RNFS from "react-native-fs";
const DownloadApkManager = NativeModules.DownloadApkManager;

class AndroidUpdateTips extends Component {
    constructor(props) {
        super(props);
        this.state = {
            update: false,
            progress: 0,
            downloadStart: false,
            status: "start",
        }
    }

    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
        this.setState({
            update: nextProps.update,
            downloadStart: nextProps.downloadStart,
            progress: nextProps.progress,
        });
    }
    update = () => {
        let downLoadUrl = "http://bos.pgzs.com/sjapp91/msoft/20180507456/23/official_website6.1.0.370.apk";
        let dirs = RNFetchBlob.fs.dirs;
        let android = RNFetchBlob.android;
        RNFS.downloadFile({
            fromUrl: downLoadUrl,
            toFile: dirs.DownloadDir + "/com.precase.apk",
            progressDivider: 5,
            begin: (res) => this.setState({downloadStart: true}) ,
            progress: (res) => {
                let pro = res.bytesWritten / res.contentLength;
                this.setState({progress: pro})
            }
        }).promise.then(() => {
            // android.actionViewIntent(
            //     dirs.DownloadDir + '/precase.apk',
            //     'application/vnd.android.package-archive'
            // );
            this.setState({update: false});
            DownloadApkManager.openAPK( dirs.DownloadDir + "/com.precase.apk")
        }).catch(() => {
            this.setState({status: "failed"})
        })
    }

    stopUpdate = () => {
        let downLoadUrl = "http://bos.pgzs.com/sjapp91/msoft/20180507456/23/official_website6.1.0.370.apk";
        RNFS.cancelDownload();
        this.setState({update: false, downloadStart: false});
    }

    render() {
        const { update, downloadStart, progress } = this.state;
        return (
            <Modal visible={update} transparent={true}>
                <TouchableOpacity onPress={() => this.setState({update: !this.state.update})} style={androidUpdateTipsStyle.container}>
                    <View style={androidUpdateTipsStyle.content}>
                        <Text style={androidUpdateTipsStyle.update_title}>
                            更新提示
                        </Text>
                        <View style={androidUpdateTipsStyle.update_tips}>
                            <Text stye={androidUpdateTipsStyle.update_tip}>
                                1.你有一双美丽的眼睛
                            </Text>
                            <Text stye={{...androidUpdateTipsStyle.update_tip, marginTop: 5}}>
                                2.你有一双迷人的眼睛
                            </Text>
                        </View>


                        { downloadStart && <View style={androidUpdateTipsStyle.update_tips}>
                            <View style={androidUpdateTipsStyle.update_progress}>
                                <View style={{...androidUpdateTipsStyle.update_progress_per, width: `${progress *100}%`}}></View>
                            </View>
                        </View>}


                        <View style={androidUpdateTipsStyle.update_line}/>
                        {downloadStart && <View style={androidUpdateTipsStyle.update_btns}>
                            <TouchableOpacity style={androidUpdateTipsStyle.update_btn} onPress={this.stopUpdate}>
                                <Text style={androidUpdateTipsStyle.update_left_text}>取消</Text>
                            </TouchableOpacity>
                            <View style={androidUpdateTipsStyle.update_btn_line}/>
                            <TouchableOpacity style={androidUpdateTipsStyle.update_btn} onPress={this.update}>
                                <Text style={androidUpdateTipsStyle.update_btn_cancel}>重新下载</Text>
                            </TouchableOpacity>
                        </View>}
                        { !downloadStart && <View style={androidUpdateTipsStyle.update_btns}>
                            <TouchableOpacity style={androidUpdateTipsStyle.update_btn} onPress={() => this.setState({update: false})}>
                                <Text style={androidUpdateTipsStyle.update_left_text}>取消</Text>
                            </TouchableOpacity>
                            <View style={androidUpdateTipsStyle.update_btn_line}/>
                            <TouchableOpacity style={androidUpdateTipsStyle.update_btn} onPress={this.update}>
                                <Text style={androidUpdateTipsStyle.update_right_text}>立即下载</Text>
                            </TouchableOpacity>
                        </View>}
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }
}
export default AndroidUpdateTips;