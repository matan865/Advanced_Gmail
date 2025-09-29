package com.example.mygmail.net;

import java.util.List;
import retrofit2.Call;
import retrofit2.http.*;

public interface ApiService {
    class LoginReq { public String identifier; public String password;
        public LoginReq(String i,String p){identifier=i; password=p;} }
    class LoginRes { public String token; public String userId; }

    @POST("api/tokens")
    Call<LoginRes> login(@Body LoginReq body);
    class RegisterRes {
        public String id, username, name, email, avatarUrl, createdAt, updatedAt;
    }
    class RegisterReq {
        public String username, password, name, avatarUrl;
        public RegisterReq(String u, String p, String n, String a) {
            username=u; password=p; name=n; avatarUrl=a;
        }
    }
    class Person { public String id, username, email, name, avatarUrl; }
    class MailDto { public String id, subject, body, date; public boolean read; public Person from; public java.util.List<Person> to; public java.util.List<String> labels;}

    class SendReq { public String to, subject, body; public SendReq(String t,String s,String b){to=t;subject=s;body=b;} }

    @GET("api/mails") Call<List<MailDto>> inbox();
    @POST("api/mails") Call<MailDto> send(@Body SendReq body);
    @GET("api/mails/{id}")
    Call<MailDto> getMail(@Path("id") String id);
    @DELETE("api/mails/{id}")
    Call<Void> delete(@Path("id") String id);
    @POST("api/users")
    Call<RegisterRes> register(@Body RegisterReq body);
    @GET("api/mails/search/{q}")
    Call<List<ApiService.MailDto>> search(@Path("q") String query);

}
