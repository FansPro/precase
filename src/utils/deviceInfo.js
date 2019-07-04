import React from "react";
import {
    Dimensions,
    Platform
} from "react-native";
const DeviceInfo = {
    deviceWidth: Dimensions.get("window").width,
    deviceHeight: Dimensions.get("window").height,
    deviceOS: Platform.OS,
    isIphoneX: Platform.OS === 'ios' && Dimensions.get('window').width === 375 && Dimensions.get('window').height === 812,
}
export default DeviceInfo;