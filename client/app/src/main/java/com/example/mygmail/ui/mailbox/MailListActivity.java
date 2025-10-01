package com.example.mygmail.ui.mailbox;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.mygmail.ComposeActivity;
import com.example.mygmail.MailAdapter;
import com.example.mygmail.R;
import com.example.mygmail.data.local.entity.MailEntity;
import com.example.mygmail.net.ApiService;

import java.util.ArrayList;
import java.util.List;

public class MailListActivity extends AppCompatActivity {
    public static final String EXTRA_LABEL = "label";
    private MailListViewModel vm;
    private MailAdapter adapter;

    @Override protected void onCreate(Bundle b) {
        super.onCreate(b);
        setContentView(R.layout.activity_mail_list);

        RecyclerView rv = findViewById(R.id.recyclerViewInbox);
        rv.setLayoutManager(new LinearLayoutManager(this));
        adapter = new MailAdapter();
        rv.setAdapter(adapter);

        vm = new ViewModelProvider(this).get(MailListViewModel.class);

        String label = getIntent().getStringExtra(EXTRA_LABEL);
        if (label == null) label = "Inbox";
        vm.setLabel(label);

        vm.mails().observe(this, entities -> adapter.setMails(toDtoLike(entities)));

        findViewById(R.id.btnCompose).setOnClickListener(
                v -> startActivity(new Intent(this, ComposeActivity.class)));

        adapter.setOnMailDelete((mail, pos) -> {
            vm.moveToTrash(mail.id, (ok,msg) -> {
                runOnUiThread(() -> {
                    if (!ok) Toast.makeText(this, "Trash failed: "+msg, Toast.LENGTH_SHORT).show();
                });
            });
        });

        adapter.setOnMailSpam((mail, pos) -> {
            vm.moveToSpam(mail.id, (ok, msg) -> {
                runOnUiThread(() -> {
                    if (!ok) Toast.makeText(this, "Spam failed: " + msg, Toast.LENGTH_SHORT).show();
                });
            });
        });

        adapter.setOnMailDrafts((mail, pos) -> {
            vm.moveToDrafts(mail.id, (ok, msg) -> {
                runOnUiThread(() -> {
                    if (!ok) Toast.makeText(this, "Draft failed: " + msg, Toast.LENGTH_SHORT).show();
                });
            });
        });
    }

    private List<ApiService.MailDto> toDtoLike(List<MailEntity> es){
        List<ApiService.MailDto> out = new ArrayList<>();
        if (es == null) return out;
        for (MailEntity e : es){
            ApiService.MailDto d = new ApiService.MailDto();
            d.id = e.id; d.subject = e.subject; d.body = e.body; d.date = e.date; d.read = e.read;
            ApiService.Person p = new ApiService.Person();
            p.name = e.fromName; p.email = e.fromEmail;
            d.from = p;
            out.add(d);
        }
        return out;
    }
}
