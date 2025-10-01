package com.example.mygmail.data;

import android.content.Context;
import com.example.mygmail.data.local.AppDatabase;
import com.example.mygmail.net.ApiClient;
import com.example.mygmail.net.ApiService;

public final class RepositoryProvider {
    private RepositoryProvider(){}
    private static MailRepository mailRepo;

    public static synchronized MailRepository mailRepository(Context ctx){
        if (mailRepo == null){
            ApiService api = ApiClient.get(ctx).create(ApiService.class);
            mailRepo = new MailRepository(AppDatabase.get(ctx), api);
        }
        return mailRepo;
    }
}
