import React, { Component, PropTypes } from 'react';
import {
    Dimensions,
    PixelRatio,
    Platform,
    StatusBar,
    View,
    SafeAreaView,
    ScrollView
} from 'react-native';
import { COLOR_BAKCGROUND, COLOR_BLUE_DARD, COLOR_WHITE } from "../constants/constants";
import { isIphoneX } from "./iPhoneUtil";

let props = {};
export default class Resolution {
    static get(useFixWidth = true) {
        return useFixWidth ? { ...props.fw } : { ...props.fh }
    }

    static setDesignSize(dwidth = 750 / 2, dheight = 1334 / 2, dim = "window") {
        let designSize = { width: dwidth, height: dheight };

        let navHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 64;
        let pxRatio = PixelRatio.get(dim);
        let { width, height } = Dimensions.get(dim);
        if (dim != "screen") height -= navHeight;
        let w = PixelRatio.getPixelSizeForLayoutSize(width);
        let h = PixelRatio.getPixelSizeForLayoutSize(height);

        let fw_design_scale = designSize.width / w;
        let fw_width = designSize.width;
        let fw_height = h * fw_design_scale;
        let fw_scale = 1 / pxRatio / fw_design_scale;

        let fh_design_scale = designSize.height / h;
        let fh_width = w * fh_design_scale;
        let fh_height = designSize.height;
        let fh_scale = 1 / pxRatio / fh_design_scale;

        props.fw = { width: fw_width, height: fw_height, scale: fw_scale, navHeight };
        props.fh = { width: fh_width, height: fh_height, scale: fh_scale, navHeight };
    }

    static FixWidthView = (p) => {
        let { width, height, scale, navHeight } = props.fw;

        let _height = height
        if (Platform.OS === 'android') {
            if (navHeight === 24) { // 无刘海
                _height = height + navHeight
                // return <View {...p} style={{
                //     width: width,
                //     height: _height,
                //     backgroundColor: COLOR_BAKCGROUND,
                //     transform: [
                //         { translateX: - width * .5 },
                //         { translateY: - height * .5 },
                //         { scale: scale },
                //         { translateX: width * .5 },
                //         { translateY: height * .5 }
                //     ]
                // }}>
                // </View>
            } else { // 有刘海
                _height = height + navHeight + StatusBar.currentHeight * 2
                // return <View {...p} style={{
                //     flex: 1,
                //     backgroundColor: COLOR_BAKCGROUND,
                // }}/>
            }
        } else {
            // _height = Dimensions.get("window").width >= 375 ? "100%" : height + 20
            if(isIphoneX()) {
                return <SafeAreaView {...p} style={{
                    right: 0,
                    left: 0,
                    bottom: 0,
                    top: 0,
                    position: "absolute",
                    backgroundColor: COLOR_BAKCGROUND,
                }}>
                </SafeAreaView>
            }
            return <View {...p} style={{
                right: 0,
                left: 0,
                bottom: 0,
                top: 0,
                position: "absolute",
                backgroundColor: COLOR_BAKCGROUND,
            }}>
            </View>
        }

        return (
            <View {...p} style={{
                flex: 1,
                backgroundColor: COLOR_BAKCGROUND,
                // width: width,
                // height: _height,
                // backgroundColor: COLOR_BAKCGROUND,
                // transform: [
                //     { translateX: - width * .5 },
                //     { translateY: - height * .5 - 0.5 },
                //     { scale: scale },
                //     { translateX: width * .5 },
                //     { translateY: height * .5 - 0.5 }
                // ]
            }}>
            </View>
        );
    };

    static FixHeightView = (p) => {
        let { width, height, scale, navHeight } = props.fh;
        return (
            <View {...p} style={{
                // marginTop: navHeight,
                width: width,
                height: height,
                backgroundColor: 'transparent',
                transform: [{ translateX: - width * .5 },
                    { translateY: - height * .5 },
                    { scale: scale },
                    { translateX: width * .5 },
                    { translateY: height * .5 }]
            }}>
                {p.children}
            </View>
        );
    };
};
//init
Resolution.setDesignSize();


/**
 * 屏幕工具类
 * ui设计基准,iphone 6
 * width:750/2
 * height:1334/2
 */
    // 获取屏幕的dp
let screenW = Dimensions.get('window').width;
let screenH = Dimensions.get('window').height;
let fontScale = PixelRatio.getFontScale();
let pixelRatio = PixelRatio.get();
// 高保真的宽度和告诉
const designWidth = 750.0 / 2;
const designHeight = 1334.0 / 2;

// 根据dp获取屏幕的px
let screenPxW = PixelRatio.getPixelSizeForLayoutSize(screenW);
let screenPxH = PixelRatio.getPixelSizeForLayoutSize(screenH);

/**
 * 设置text
 * @param size  px
 * @returns {Number} dp
 */
export function setSpText(size: Number) {
    console.log("screenW======" + screenW)
    console.log("screenPxW======" + screenPxW)
    let scaleWidth = screenW / designWidth;
    let scaleHeight = screenH / designHeight;
    let scale = Math.min(scaleWidth, scaleHeight);
    size = Math.round(size * scale / fontScale + 0.5);
    return size;
}

/**
 * 设置高度
 * @param size  px
 * @returns {Number} dp
 */
export function scaleH(size: Number) {
    let scaleHeight = size * screenPxH / designHeight;
    size = Math.round((scaleHeight / pixelRatio + 0.5));
    return size;
}

/**
 * 设置宽度
 * @param size  px
 * @returns {Number} dp
 */
export function scaleW(size: Number) {
    let scaleWidth = size * screenPxW / designWidth;
    size = Math.round((scaleWidth / pixelRatio + 0.5));
    return size;
}