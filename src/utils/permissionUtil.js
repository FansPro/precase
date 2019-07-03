import React from "react";
import {
    PermissionsAndroid,
} from "react-native";
const PermissionUtil = {
    checkWritePms: function () {
        return  PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE).then(pms => {
            console.log("PMS:", pms);
            if (pms) {
                return new Promise.resolve();
            } else {
                PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE).then(rs => {
                    console.log("rsss:", rs)
                    if (rs === "granted") {
                        return new Promise.resolve();
                    }else {
                        return new Promise.reject();
                    }
                })
            }
        })
    }
}
export default PermissionUtil;