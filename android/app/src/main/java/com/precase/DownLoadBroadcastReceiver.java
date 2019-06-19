package com.precase;

import android.content.BroadcastReceiver;
import android.app.DownloadManager;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.database.Cursor;
import android.net.Uri;
import android.widget.Toast;

import java.io.File;

public class DownLoadBroadcastReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        long myDownloadID = intent.getLongExtra(DownloadManager.EXTRA_DOWNLOAD_ID, -1);
        SharedPreferences sPreferences = context.getSharedPreferences("ggfw_download", 0);

        long reference = sPreferences.getLong("ggfw_download_apk", 0);

        if (reference == myDownloadID) {
            DownloadManager downloadManager = (DownloadManager)context.getSystemService(Context.DOWNLOAD_SERVICE);

            Intent install = new Intent(Intent.ACTION_VIEW);
            DownloadManager.Query queryId = new DownloadManager.Query();
            Cursor myDownload = downloadManager.query(queryId);
            String downloadname = null;
            if (myDownload.moveToFirst()) {
                int status = myDownload.getInt(myDownload.getColumnIndex(DownloadManager.COLUMN_STATUS));
                if (status == DownloadManager.STATUS_SUCCESSFUL) {
                    int filenameIdx = myDownload.getColumnIndex(DownloadManager.COLUMN_LOCAL_FILENAME);
                    downloadname = myDownload.getString(filenameIdx);
                } else {
                    Toast.makeText(context, "下载失败", Toast.LENGTH_LONG).show();
                    downloadManager.remove(myDownloadID);
                    myDownload.close();
                    return;
                }
                if (downloadname == null) {
                    return;
                }
                File file = new File(downloadname);
                install.setDataAndType(Uri.fromFile(file), "application/vnd.android.package-archive");
                install.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                context.getApplicationContext().startActivity(install);
            }
        }

    }
}
