package com.precase;

import android.content.Intent;
import android.content.ComponentName;
import android.os.Bundle;
import android.util.Base64;
import android.content.Context;
import java.io.FileOutputStream;
import java.io.File;
import java.io.IOException;

import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.uimanager.IllegalViewOperationException;
import com.facebook.react.bridge.Callback;

import java.util.Map;
import java.util.HashMap;


public class DecodeAudioManager extends ReactContextBaseJavaModule {

    private ReactApplicationContext Context;
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
            tempFile = File.createTempFile("recording", ".m4a", getCurrentActivity().getCacheDir());
            byte[] buffer =Base64.decode(base64Str.split(",")[1], Base64.DEFAULT);
            FileOutputStream out = new FileOutputStream(tempFile);
            out.write(buffer);
            out.close();
            callback.invoke(tempFile.getPath());
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            callback.invoke("error");
        }
    }

}