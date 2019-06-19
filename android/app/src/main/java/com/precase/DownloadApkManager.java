package com.precase;



import android.app.Activity;
import android.app.DownloadManager;
import android.app.ProgressDialog;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Environment;
import android.support.v4.content.FileProvider;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.File;
import java.io.IOException;
import java.util.Map;
import java.util.HashMap;

import javax.annotation.Nonnull;

public class DownloadApkManager extends ReactContextBaseJavaModule {
    private ReactApplicationContext Context;
    private ProgressDialog progressDialog;
    DownloadManager downManager ;
    Activity myActivity;

    public DownloadApkManager(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "DownloadApkManager";
    }

    @ReactMethod
    public void openAPK(String fileSavePath){

        Intent intent = new Intent();
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        intent.setAction(Intent.ACTION_VIEW);
        File apkFile = new File(fileSavePath);
        String[] command = {"chmod", "777", apkFile.getPath() };
        ProcessBuilder builder = new ProcessBuilder(command);
        try {
            builder.start();
        } catch (IOException e) {
            e.printStackTrace();
        }
        Uri uri = FileProvider.getUriForFile(getCurrentActivity(), getCurrentActivity().getPackageName() + ".fileprovider", apkFile);
        intent.setData(uri);
        intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
        getCurrentActivity().startActivity(intent);
    }
}
