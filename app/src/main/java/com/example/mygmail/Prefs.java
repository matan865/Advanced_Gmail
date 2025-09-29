package com.example.mygmail;

import android.content.Context;
import android.content.SharedPreferences;

public class Prefs {
    private static final String FILE = "settings";
    private static final String KEY_BASE_URL = "base_url";
    private static final String KEY_TOKEN    = "auth_token";
    private static final String KEY_USER_ID  = "auth_user_id";
    private static boolean runOnPhone = false;

    public static void setRunOnPhone(boolean on) {
        runOnPhone = on;
    }

    private static SharedPreferences sp(Context ctx) {
        return ctx.getSharedPreferences(FILE, Context.MODE_PRIVATE);
    }

//    public static String getBaseUrl(Context ctx) {
//        return sp(ctx).getString(KEY_BASE_URL, "http://10.0.2.2:3000/");
//    }
//    public static String usePhoneBaseUrl(Context ctx) {
//        return sp(ctx).getString(KEY_BASE_URL, "http://localhost:3000/");
//    }
    public static String getBaseUrl(Context ctx) {
        if (runOnPhone) {
            return sp(ctx).getString(KEY_BASE_URL, "http://localhost:3000/");
        } else {
            return sp(ctx).getString(KEY_BASE_URL, "http://10.0.2.2:3000/");
        }
    }

    public static void setBaseUrl(Context ctx, String url) {
        sp(ctx).edit().putString(KEY_BASE_URL, url).apply();
    }

    public static void saveToken(Context ctx, String token, String userId){
        sp(ctx).edit().putString(KEY_TOKEN, token).putString(KEY_USER_ID, userId).apply();
    }
    public static String token(Context ctx){ return sp(ctx).getString(KEY_TOKEN, null); }
    public static String userId(Context ctx){ return sp(ctx).getString(KEY_USER_ID, null); }
    public static void clearAuth(Context ctx){ sp(ctx).edit().remove(KEY_TOKEN).remove(KEY_USER_ID).apply(); }

    private static final String KEY_DARK = "dark_mode";

    public static boolean isDark(Context ctx) {
        return sp(ctx).getBoolean(KEY_DARK, false);
    }
    public static void setDark(Context ctx, boolean on) {
        sp(ctx).edit().putBoolean(KEY_DARK, on).apply();
    }
}
