import React, { Component } from "react";
import {
    View,
    Modal,
} from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import PropTypes from "prop-types";

class ImageModal extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { imageData, close, modalVisible } = this.props;
        // let IsArray = Array.isArray(this.props.imaeDataUrl)
        let imageObjArray = [];
        let Obj = {};
        Obj.url = "file:///" + imageData;
        imageObjArray.push(Obj)


        return (
            <Modal style={{position: "absolute", top: -20, left: 0, right: 0, bottom: 0}} visible={modalVisible} transparent={true}>
                <ImageViewer
                    imageUrls={imageObjArray}
                    enableImageZoom={true} // 是否开启手势缩放
                    saveToLocalByLongPress={true} //是否开启长按保存
                    onClick={close}
                    menuContext={{ "saveToLocal": "保存图片", "cancel": "取消" }}
                    onSave={() => {}}
                    renderHeader={() => null}
                />
            </Modal>
        )
    }
}

ImageModal.propTypes = {
    imageData: PropTypes.array.isRequired, // 传入需要预览图片的数组
}
export default ImageModal;