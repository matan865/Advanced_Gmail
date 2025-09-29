package com.example.mygmail.data;

import android.util.Log;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import com.example.mygmail.data.local.AppDatabase;
import com.example.mygmail.data.local.dao.MailDao;
import com.example.mygmail.data.local.entity.MailEntity;
import com.example.mygmail.data.mappers.MailMappers;
import com.example.mygmail.net.ApiService;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MailRepository {
    private final MailDao dao;
    private final ApiService api;
    private final ExecutorService io = Executors.newSingleThreadExecutor();

    public MailRepository(AppDatabase db, ApiService api){
        this.dao = db.mailDao();
        this.api = api;
    }


    public LiveData<List<MailEntity>> inbox(){ return dao.observeInbox(); }
    public LiveData<MailEntity> mailById(String id){ return dao.observeById(id); }

    public LiveData<List<MailEntity>> observeByLabel(String label){
        return dao.observeByLabel(label);
    }

    public void refreshInbox(){
        api.inbox().enqueue(new Callback<List<ApiService.MailDto>>() {
            @Override public void onResponse(Call<List<ApiService.MailDto>> c, Response<List<ApiService.MailDto>> r) {
                if (!r.isSuccessful() || r.body()==null) return;
                List<MailEntity> list = new ArrayList<>();
                for (ApiService.MailDto d : r.body()) list.add(MailMappers.dtoToEntity(d));
                io.execute(() -> dao.upsertAll(list));
            }
            @Override public void onFailure(Call<List<ApiService.MailDto>> c, Throwable t) {}
        });
    }

    public void refreshLabel(String label){
        api.inbox().enqueue(new Callback<List<ApiService.MailDto>>() {
            @Override public void onResponse(Call<List<ApiService.MailDto>> c,
                                             Response<List<ApiService.MailDto>> r) {
                if (!r.isSuccessful() || r.body() == null) return;

                io.execute(() -> {
                    List<MailEntity> merged = new ArrayList<>();

                    for (ApiService.MailDto d : r.body()) {
                        MailEntity e = MailMappers.dtoToEntity(d);
                        MailEntity existing = dao.getByIdNow(e.id);
                        if (existing != null) {
                            e.trashed = existing.trashed;
                            if (existing.labels != null && !existing.labels.isEmpty()) {
                                e.labels = existing.labels;
                            }
                        }

                        if ("Trash".equalsIgnoreCase(label)) {
                            if (e.trashed) merged.add(e);
                        } else {
                            if (!e.trashed && e.labels != null && e.labels.contains(label)) {
                                merged.add(e);
                            }
                        }
                    }

                    dao.upsertAll(merged);
                });
            }
            @Override public void onFailure(Call<List<ApiService.MailDto>> c, Throwable t) {}
        });
    }


    public void refreshMail(String id){
        api.getMail(id).enqueue(new Callback<ApiService.MailDto>() {
            @Override public void onResponse(Call<ApiService.MailDto> c, Response<ApiService.MailDto> r) {
                if (!r.isSuccessful() || r.body()==null) return;
                io.execute(() -> {
                    MailEntity e = MailMappers.dtoToEntity(r.body());
                    MailEntity existing = dao.getByIdNow(e.id);
                    if (existing != null) e.trashed = existing.trashed;
                    dao.upsert(e);
                });
            }
            @Override public void onFailure(Call<ApiService.MailDto> c, Throwable t) {}
        });
    }


    public interface SimpleCallback { void onDone(boolean ok, String msg); }

    public void send(String to,String subject,String body, SimpleCallback cb){
        api.send(new ApiService.SendReq(to,subject,body)).enqueue(new Callback<ApiService.MailDto>() {
            @Override public void onResponse(Call<ApiService.MailDto> c, Response<ApiService.MailDto> r) {
                boolean ok = r.isSuccessful() && r.body()!=null;
                if (ok) {
                    MailEntity sent = MailMappers.dtoToEntity(r.body());
                    io.execute(() -> dao.upsert(sent));
                    refreshLabel("Sent");
                }
                if (cb!=null) cb.onDone(ok, ok ? "" : "HTTP "+r.code());
            }
            @Override public void onFailure(Call<ApiService.MailDto> c, Throwable t) {
                if (cb!=null) cb.onDone(false, t.getMessage());
            }
        });
    }

    public void delete(String id, SimpleCallback cb){
        api.delete(id).enqueue(new Callback<Void>() {
            @Override public void onResponse(Call<Void> c, Response<Void> r) {
                boolean ok = r.isSuccessful();
                if (ok) io.execute(() -> dao.delete(id));
                if (cb!=null) cb.onDone(ok, ok ? "" : "HTTP "+r.code());
            }
            @Override public void onFailure(Call<Void> c, Throwable t) {
                if (cb!=null) cb.onDone(false, t.getMessage());
            }
        });
    }
    public void moveToTrash(String id, SimpleCallback cb){
        io.execute(() -> {
            MailEntity e = dao.getByIdNow(id);
            if (e == null) { if (cb != null) cb.onDone(false, "not found"); return; }
            e.trashed = true;
            dao.upsert(e);
            if (cb != null) cb.onDone(true, "");
        });
    }

    public void moveToSpam(String id, SimpleCallback cb) {
        io.execute(() -> {
            MailEntity e = dao.getByIdNow(id);
            if (e == null) { if (cb != null) cb.onDone(false, "not found"); return; }

            List<String> labels = e.labels != null ? new ArrayList<>(e.labels) : new ArrayList<>();
            labels.remove("Inbox");
            labels.remove("Sent");
            labels.remove("Drafts");
            labels.remove("Trash");
            if (!labels.contains("Spam")) labels.add("Spam");

            e.labels = labels;
            dao.upsert(e);
            if (cb != null) cb.onDone(true, "");
        });
    }

    public void moveToDrafts(String id, SimpleCallback cb) {
        io.execute(() -> {
            MailEntity e = dao.getByIdNow(id);
            if (e == null) { if (cb != null) cb.onDone(false, "not found"); return; }

            List<String> labels = e.labels != null ? new ArrayList<>(e.labels) : new ArrayList<>();
            labels.remove("Inbox");
            labels.remove("Sent");
            labels.remove("Spam");
            labels.remove("Trash");
            if (!labels.contains("Drafts")) labels.add("Drafts");

            e.labels = labels;
            dao.upsert(e);
            if (cb != null) cb.onDone(true, "");
        });
    }

    public LiveData<List<MailEntity>> observeTrash() {
        return dao.observeTrash();
    }

    public LiveData<List<MailEntity>> search(String query){
        MutableLiveData<List<MailEntity>> live = new MutableLiveData<>();
        api.search(query).enqueue(new Callback<List<ApiService.MailDto>>() {
            @Override public void onResponse(Call<List<ApiService.MailDto>> c, Response<List<ApiService.MailDto>> r) {
                if (!r.isSuccessful() || r.body()==null){ live.postValue(new ArrayList<>()); return; }
                List<MailEntity> list = new ArrayList<>();
                for (ApiService.MailDto d : r.body()) list.add(MailMappers.dtoToEntity(d));
                live.postValue(list);
            }
            @Override public void onFailure(Call<List<ApiService.MailDto>> c, Throwable t) {
                live.postValue(new ArrayList<>());
            }
        });
        return live;
    }

}
