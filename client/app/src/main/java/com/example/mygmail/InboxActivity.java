package com.example.mygmail;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.mygmail.net.ApiClient;
import com.example.mygmail.net.ApiService;
import com.example.mygmail.ui.inbox.InboxViewModel;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

//public class InboxActivity extends AppCompatActivity {
//    private RecyclerView recyclerView;
//    private MailAdapter mailAdapter;
//
//    @Override
//    protected void onCreate(Bundle b) {
//        super.onCreate(b);
//        setContentView(R.layout.activity_inbox);
//
//        recyclerView = findViewById(R.id.recyclerViewInbox);
//        recyclerView.setLayoutManager(new LinearLayoutManager(this));
//
//        mailAdapter = new MailAdapter();
//        mailAdapter.setOnMailClick((mail, position) -> {
//            Intent i = new Intent(this, MailDetailActivity.class);
//            i.putExtra("mail_id", mail.id);
//            startActivity(i);
//        });
//
//        mailAdapter.setOnMailDelete((mail, pos) -> {
//            mailAdapter.removeAt(pos);
//            ApiService api = ApiClient.get(this).create(ApiService.class);
//            api.delete(mail.id).enqueue(new retrofit2.Callback<Void>() {
//                @Override
//                public void onResponse(retrofit2.Call<Void> c, retrofit2.Response<Void> r) {
//                    if (!r.isSuccessful()) {
//                        mailAdapter.insertAt(pos, mail);
//                        Toast.makeText(InboxActivity.this, "Delete failed: " + r.code(), Toast.LENGTH_SHORT).show();
//                    }
//                }
//
//                @Override
//                public void onFailure(retrofit2.Call<Void> c, Throwable t) {
//                    mailAdapter.insertAt(pos, mail);
//                    Toast.makeText(InboxActivity.this, "Network error: " + t.getMessage(), Toast.LENGTH_SHORT).show();
//                }
//            });
//        });
//
//        recyclerView.setAdapter(mailAdapter);
//
//        findViewById(R.id.btnCompose).setOnClickListener(v ->
//                startActivity(new Intent(this, ComposeActivity.class))
//        );
//
//        loadInbox();
//    }
//
//    @Override
//    protected void onResume() {
//        super.onResume();
//        loadInbox();
//    }
//
//    private void loadInbox() {
//        ApiService api = ApiClient.get(this).create(ApiService.class);
//        api.inbox().enqueue(new retrofit2.Callback<java.util.List<ApiService.MailDto>>() {
//            @Override
//            public void onResponse(retrofit2.Call<java.util.List<ApiService.MailDto>> c,
//                                   retrofit2.Response<java.util.List<ApiService.MailDto>> r) {
//                if (!r.isSuccessful() || r.body() == null) {
//                    android.widget.Toast.makeText(InboxActivity.this,
//                            "Inbox failed: " + r.code(), android.widget.Toast.LENGTH_SHORT).show();
//                    return;
//                }
//                mailAdapter.setMails(r.body());
//            }
//
//            @Override
//            public void onFailure(retrofit2.Call<java.util.List<ApiService.MailDto>> c, Throwable t) {
//                android.widget.Toast.makeText(InboxActivity.this,
//                        "Network error: " + t.getMessage(), android.widget.Toast.LENGTH_SHORT).show();
//            }
//        });
//    }
//}
public class InboxActivity extends AppCompatActivity {
    private RecyclerView recyclerView;
    private MailAdapter mailAdapter;
    private InboxViewModel vm;

    @Override
    protected void onCreate(Bundle b) {
        super.onCreate(b);
        setContentView(R.layout.activity_inbox);

        recyclerView = findViewById(R.id.recyclerViewInbox);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        mailAdapter = new MailAdapter();
        recyclerView.setAdapter(mailAdapter);

        vm = new ViewModelProvider(this).get(InboxViewModel.class);

        vm.inbox().observe(this, list -> {
            java.util.List<ApiService.MailDto> viewList = new java.util.ArrayList<>();
            for (com.example.mygmail.data.local.entity.MailEntity e : list){
                ApiService.MailDto d = new ApiService.MailDto();
                d.id = e.id; d.subject = e.subject; d.body = e.body; d.date = e.date; d.read = e.read;
                ApiService.Person p = new ApiService.Person(); p.name = e.fromName; p.email = e.fromEmail; d.from = p;
                viewList.add(d);
            }
            mailAdapter.setMails(viewList);
        });

        mailAdapter.setOnMailClick((mail, position) -> {
            Intent i = new Intent(this, MailDetailActivity.class);
            i.putExtra("mail_id", mail.id);
            startActivity(i);
        });

        mailAdapter.setOnMailDelete((mail, pos) -> {
            ApiService.MailDto backup = mailAdapter.getItem(pos);
            mailAdapter.removeAt(pos);
            vm.delete(mail.id, (ok, msg) -> {
                if (!ok) {
                    runOnUiThread(() -> {
                        mailAdapter.insertAt(pos, backup);
                        Toast.makeText(this, "Delete failed: " + msg, Toast.LENGTH_SHORT).show();
                    });
                }
            });
        });

        findViewById(R.id.btnCompose).setOnClickListener(v ->
                startActivity(new Intent(this, ComposeActivity.class))
        );
    }

    @Override protected void onResume() {
        super.onResume();
        vm.refresh();
    }
}
