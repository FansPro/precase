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


import java.util.Map;
import java.util.HashMap;


public class NativeOpenManager extends ReactContextBaseJavaModule {

    private ReactApplicationContext Context;
    public NativeOpenManager(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "NativeOpenManager";
    }

    @ReactMethod
    public void open(String packageName, Promise promise) {
        // try {
        //     Intent intent = getReactApplicationContext().getPackageManager().getLaunchIntentForPackage(packageName);
        //     if(intent !=null){
        //         // intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        //         // getReactApplicationContext().startActivity(intent);
        //         intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
        //         getCurrentActivity().startActivity(intent);
        //         promise.resolve("ok");
        //     }
        //     else{
        //         promise.resolve("fail");
        //     }
        // }
        // catch (IllegalViewOperationException e){
        //     promise.resolve("fail");
        // }

        Intent intent = new Intent("android.intent.action.SINGLE_INSTANCE_SHARE");
        // intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
        getCurrentActivity().startActivity(intent);
    }


}