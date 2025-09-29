package com.example.mygmail;

import android.os.Bundle;
import android.view.View;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;

import com.example.mygmail.net.ApiClient;
import com.example.mygmail.net.ApiService;
import com.example.mygmail.ui.details.MailDetailViewModel;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

//public class MailDetailActivity extends AppCompatActivity {
//
//    private TextView tvSubject, tvFrom, tvDate, tvBody;
//    private ProgressBar progress;
//
//    @Override
//    protected void onCreate(Bundle b) {
//        super.onCreate(b);
//        setContentView(R.layout.activity_mail_detail);
//
//        tvSubject = findViewById(R.id.tvSubject);
//        tvFrom    = findViewById(R.id.tvFrom);
//        tvDate    = findViewById(R.id.tvDate);
//        tvBody    = findViewById(R.id.tvBody);
//        progress  = findViewById(R.id.progress);
//
//        String mailId = getIntent().getStringExtra("mail_id");
//        if (mailId == null || mailId.isEmpty()) {
//            Toast.makeText(this, "Missing mail_id", Toast.LENGTH_SHORT).show();
//            finish();
//            return;
//        }
//
//        loadMail(mailId);
//    }
//
//    private void loadMail(String id) {
//        progress.setVisibility(View.VISIBLE);
//
//        ApiService api = ApiClient.get(this).create(ApiService.class);
//        api.getMail(id).enqueue(new Callback<ApiService.MailDto>() {
//            @Override
//            public void onResponse(Call<ApiService.MailDto> c, Response<ApiService.MailDto> r) {
//                progress.setVisibility(View.GONE);
//
//                if (!r.isSuccessful() || r.body() == null) {
//                    Toast.makeText(MailDetailActivity.this,
//                            "Failed: " + r.code(), Toast.LENGTH_SHORT).show();
//                    return;
//                }
//
//                ApiService.MailDto m = r.body();
//                tvSubject.setText(m.subject != null ? m.subject : "(no subject)");
//
//                String from = (m.from != null && m.from.name != null) ? m.from.name
//                        : (m.from != null && m.from.email != null) ? m.from.email : "";
//                tvFrom.setText(from);
//
//                tvDate.setText(m.date != null ? m.date : "");
//                tvBody.setText(m.body != null ? m.body : "");
//            }
//
//            @Override
//            public void onFailure(Call<ApiService.MailDto> c, Throwable t) {
//                progress.setVisibility(View.GONE);
//                Toast.makeText(MailDetailActivity.this,
//                        "Network error: " + t.getMessage(), Toast.LENGTH_SHORT).show();
//            }
//        });
//    }
//}
public class MailDetailActivity extends AppCompatActivity {
    private TextView tvSubject, tvFrom, tvDate, tvBody;
    private ProgressBar progress;
    private MailDetailViewModel vm;
    private String mailId;

    @Override
    protected void onCreate(Bundle b) {
        super.onCreate(b);
        setContentView(R.layout.activity_mail_detail);

        tvSubject = findViewById(R.id.tvSubject);
        tvFrom = findViewById(R.id.tvFrom);
        tvDate = findViewById(R.id.tvDate);
        tvBody = findViewById(R.id.tvBody);
        progress = findViewById(R.id.progress);

        mailId = getIntent().getStringExtra("mail_id");
        if (mailId == null || mailId.isEmpty()) { Toast.makeText(this,"Missing mail_id",Toast.LENGTH_SHORT).show(); finish(); return; }

        vm = new ViewModelProvider(this).get(MailDetailViewModel.class);

        vm.mail(mailId).observe(this, e -> {
            if (e==null) return;
            tvSubject.setText(e.subject!=null?e.subject:"(no subject)");
            String from = e.fromName!=null?e.fromName:(e.fromEmail!=null?e.fromEmail:"");
            tvFrom.setText(from);
            tvDate.setText(e.date!=null?e.date:"");
            tvBody.setText(e.body!=null?e.body:"");
        });

        progress.setVisibility(View.VISIBLE);
        vm.refresh(mailId);
        progress.setVisibility(View.GONE);
    }
}

