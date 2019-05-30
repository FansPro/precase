package com.precase;

import android.content.Intent;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.meiqia.meiqiasdk.util.MQIntentBuilder;

/**
 * Created by ywen(yaliyingwy@gmail.com) on 2017/7/5.
 */

public class MeiqiaManager extends ReactContextBaseJavaModule {
    public MeiqiaManager(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "MeiqiaManager";
    }

    @ReactMethod
    public void show() {
        Intent intent = new MQIntentBuilder(getCurrentActivity()).build();
        getCurrentActivity().startActivity(intent);
    }
}