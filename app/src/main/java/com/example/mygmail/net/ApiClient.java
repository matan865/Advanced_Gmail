package com.example.mygmail.net;

import android.content.Context;
import com.example.mygmail.Prefs;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

public final class ApiClient {
    private static Retrofit retrofit;

    private static Retrofit build(Context ctx) {
        String baseUrl = Prefs.getBaseUrl(ctx);
        HttpLoggingInterceptor log = new HttpLoggingInterceptor();
        log.setLevel(HttpLoggingInterceptor.Level.BODY);

        OkHttpClient ok = new OkHttpClient.Builder()
                .addInterceptor(chain -> {
                    Request req = chain.request();
                    String t = Prefs.token(ctx);
                    if (t != null && !t.isEmpty()) {
                        req = req.newBuilder().addHeader("Authorization","Bearer " + t).build();
                    }
                    return chain.proceed(req);
                })
                .addInterceptor(log)
                .build();

        Gson gson = new GsonBuilder()
                .registerTypeAdapter(
                        new TypeToken<java.util.List<ApiService.Person>>(){}.getType(),
                        new PersonListAdapter()
                )
                .create();

        return new Retrofit.Builder()
                .baseUrl(ensureSlash(baseUrl))
                .client(ok)
                .addConverterFactory(GsonConverterFactory.create(gson))
                .build();
    }

    private static String ensureSlash(String s){ return s.endsWith("/") ? s : s + "/"; }

    public static synchronized Retrofit get(Context ctx) {
        if (retrofit == null) retrofit = build(ctx);
        return retrofit;
    }

    public static synchronized void updateBaseUrl(Context ctx, String newUrl){
        Prefs.setBaseUrl(ctx, newUrl);
        retrofit = build(ctx);
    }
}
