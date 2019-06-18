package com.precase;

import android.content.Intent;
import android.content.ComponentName;
import android.os.Bundle;
import android.util.Base64;
import android.content.Context;
import java.io.FileOutputStream;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.uimanager.IllegalViewOperationException;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;

import java.util.Map;
import java.util.HashMap;
import java.text.SimpleDateFormat;


public class DecodeAudioManager extends ReactContextBaseJavaModule {

    private ReactApplicationContext Context;
    private Promise promise;
    public DecodeAudioManager(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "DecodeAudioManager";
    }



    @ReactMethod
    public void decodeAudio(String base64Str, Callback callback) {
        File  tempFile = null;
        try {
            // 创建临时文件,注意这里的格式为.pcm  .amr  .mp3
            SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
            Date date = new Date(System.currentTimeMillis());
            String time = sdf.format(date);
            String dataType = base64Str.substring(base64Str.indexOf("/"), base64Str.indexOf(";") + 1);
            tempFile = File.createTempFile("temp_" + time, "." + dataType, getCurrentActivity().getCacheDir());
            byte[] buffer =Base64.decode(base64Str.split(",")[1], Base64.DEFAULT);
            FileOutputStream out = new FileOutputStream(tempFile);
            out.write(buffer);
            out.close();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } finally {
            String  filename = "";
            if(tempFile==null) {
                filename = "";
            } else {
                filename = tempFile.getPath();
            }
            callback.invoke(filename);
        }
    }

}