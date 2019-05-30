package com.precase;

import android.content.Intent;

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
    public void open(String packageName,Promise promise) {
        try {
            Intent intent = getReactApplicationContext().getPackageManager().getLaunchIntentForPackage(packageName);
            if(intent !=null){
                intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                getReactApplicationContext().startActivity(intent);
                promise.resolve("ok");
            }
            else{
                promise.resolve("fail");
            }
        }
        catch (IllegalViewOperationException e){
            promise.resolve("fail");
        }

    }
}