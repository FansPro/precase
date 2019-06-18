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
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        Date date = new Date(System.currentTimeMillis());
        String time = sdf.format(date);
        String dataType = base64Str.substring(base64Str.indexOf("/"), base64Str.indexOf(";") + 1);
        callback.invoke(dataType);
      
    }

}