package com.precase;

import android.app.Application;
import android.widget.Toast;

import com.facebook.react.ReactApplication;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.meiqia.meiqiasdk.util.MQConfig;
import com.meiqia.core.callback.OnInitCallback;
import com.meiqia.core.MQManager;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNCWebViewPackage(),
            new RNGestureHandlerPackage(),
            new NativeOpenPackage(),
          new MeiqiaPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();

    SoLoader.init(this, /* native exopackage */ false);
    initMeiqiaSDK();
  }

  private void initMeiqiaSDK() {
       Toast.makeText(MainApplication.this, "oooooo", Toast.LENGTH_SHORT).show();
//         MQManager.setDebugMode(true);
        // 替换成自己的key
//        String meiqiaKey = "34351ebfad18ad6e4a3b1a29b865f706";
        MQConfig.init(this, "34351ebfad18ad6e4a3b1a29b865f706", new OnInitCallback() {
            @Override
            public void onSuccess(String clientId) {
                Toast.makeText(MainApplication.this, "init success", Toast.LENGTH_SHORT).show();
             }

            @Override
            public void onFailure(int code, String message) {
                Toast.makeText(MainApplication.this, "int failure message = ", Toast.LENGTH_SHORT).show();
            }
         });

  }
}
