package com.precase;

import android.content.Intent;
import android.content.ComponentName;
import android.os.Bundle;

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
        try {
            Intent intent = getReactApplicationContext().getPackageManager().getLaunchIntentForPackage(packageName);
            if(intent !=null){
                intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
                getCurrentActivity().startActivity(intent);
                promise.resolve("ok");
            }
            else{
                promise.resolve("fail");
            }
        }
        catch (IllegalViewOperationException e){
            promise.resolve("fail");
        }

        // Intent intent = new getReactApplicationContext().getPackageManager().getLaunchIntentForPackage("com.cuber.JQKCD");
        // // intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        // intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
        // getCurrentActivity().startActivity(intent);
    }

}