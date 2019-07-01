package com.precase;

import android.app.Application;
import android.util.Log;
import android.widget.Toast;
import android.content.Intent;


import com.facebook.react.ReactApplication;
import com.horcrux.svg.SvgPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import io.realm.react.RealmReactPackage;
import cn.jystudio.local.barcode.recognizer.LocalBarcodeRecognizerPackage;
import com.imagepicker.ImagePickerPackage;
import org.reactnative.camera.RNCameraPackage;
import com.microsoft.codepush.react.CodePush;
import com.rnfs.RNFSPackage;
import com.rnxmpp.RNXMPPPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.meiqia.meiqiasdk.util.MQConfig;
import com.meiqia.core.callback.OnInitCallback;
import com.meiqia.core.MQManager;
import cn.jiguang.imui.messagelist.ReactIMUIPackage;
import cn.jpush.reactnativejpush.JPushPackage;

import java.util.Arrays;
import java.util.List;


public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        @Override
        protected String getJSBundleFile() {
        return CodePush.getJSBundleFile();
        }
    
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new SvgPackage(),
            new SplashScreenReactPackage(),
            new RNFetchBlobPackage(),
            new RealmReactPackage(),
            new LocalBarcodeRecognizerPackage(),
            new ImagePickerPackage(),
            new RNCameraPackage(),
            new CodePush(BuildConfig.CODEPUSH_KEY, getApplicationContext(), BuildConfig.DEBUG),
            new RNFSPackage(),
            new RNXMPPPackage(),
            new RNI18nPackage(),
            new RNCWebViewPackage(),
            new RNGestureHandlerPackage(),
            new NativeOpenPackage(),
            new MeiqiaPackage(),
            new DecodeAudioPackage(),
            new ReactIMUIPackage(),
            new JPushPackage(true, true),
              new DownloadApkPackage()
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
        MQManager.setDebugMode(true);
        // 替换成自己的key
//        String meiqiaKey = "34351ebfad18ad6e4a3b1a29b865f706";
        MQConfig.init(this, "6a031e3cec7bbaf0f7bac757c4999c53", new OnInitCallback() {
            @Override
            public void onSuccess(String clientId) {
                Log.d("sadfj", "123123123");
             }

            @Override
            public void onFailure(int code, String message) {
                Log.d("sadfj", "123123");
            }
         });

  }
}
