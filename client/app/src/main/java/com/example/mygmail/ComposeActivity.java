package com.example.mygmail;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;

import com.example.mygmail.net.ApiClient;
import com.example.mygmail.net.ApiService;
import com.example.mygmail.ui.compose.ComposeViewModel;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

//public class ComposeActivity extends AppCompatActivity {
//
//    private EditText etTo, etSubject, etBody;
//    private Button btnSend;
//    private ProgressBar progress;
//
//    @Override
//    protected void onCreate(Bundle b) {
//        super.onCreate(b);
//        setContentView(R.layout.activity_compose);
//
//        etTo = findViewById(R.id.etTo);
//        etSubject = findViewById(R.id.etSubject);
//        etBody = findViewById(R.id.etBody);
//        btnSend = findViewById(R.id.btnSend);
//        progress = findViewById(R.id.progress);
//
//        btnSend.setOnClickListener(v -> sendMail());
//    }
//
//    private void sendMail() {
//        String to = etTo.getText().toString().trim();
//        String subject = etSubject.getText().toString().trim();
//        String body = etBody.getText().toString().trim();
//
//        if (to.isEmpty()) { etTo.setError("Required"); etTo.requestFocus(); return; }
//        if (subject.isEmpty()) { etSubject.setError("Required"); etSubject.requestFocus(); return; }
//        if (body.isEmpty()) { etBody.setError("Required"); etBody.requestFocus(); return; }
//
//        btnSend.setEnabled(false);
//        progress.setVisibility(View.VISIBLE);
//
//        ApiService api = ApiClient.get(this).create(ApiService.class);
//        api.send(new ApiService.SendReq(to, subject, body))
//                .enqueue(new Callback<ApiService.MailDto>() {
//                    @Override
//                    public void onResponse(Call<ApiService.MailDto> c, Response<ApiService.MailDto> r) {
//                        btnSend.setEnabled(true);
//                        progress.setVisibility(View.GONE);
//
//                        if (!r.isSuccessful() || r.body() == null) {
//                            Toast.makeText(ComposeActivity.this, "Send failed: " + r.code(), Toast.LENGTH_SHORT).show();
//                            return;
//                        }
//
//                        Toast.makeText(ComposeActivity.this, "Sent", Toast.LENGTH_SHORT).show();
//                        setResult(RESULT_OK);
//                        finish();
//                    }
//
//                    @Override
//                    public void onFailure(Call<ApiService.MailDto> c, Throwable t) {
//                        btnSend.setEnabled(true);
//                        progress.setVisibility(View.GONE);
//                        Toast.makeText(ComposeActivity.this, "Network error: " + t.getMessage(), Toast.LENGTH_SHORT).show();
//                    }
//                });
//    }
//}
public class ComposeActivity extends AppCompatActivity {
    private EditText etTo, etSubject, etBody;
    private Button btnSend;
    private ProgressBar progress;
    private ComposeViewModel vm;

    @Override
    protected void onCreate(Bundle b) {
        super.onCreate(b);
        setContentView(R.layout.activity_compose);

        etTo = findViewById(R.id.etTo);
        etSubject = findViewById(R.id.etSubject);
        etBody = findViewById(R.id.etBody);
        btnSend = findViewById(R.id.btnSend);
        progress = findViewById(R.id.progress);

        vm = new ViewModelProvider(this).get(ComposeViewModel.class);

        btnSend.setOnClickListener(v -> sendMail());
    }

    private void sendMail(){
        String to = etTo.getText().toString().trim();
        String subject = etSubject.getText().toString().trim();
        String body = etBody.getText().toString().trim();
        if (to.isEmpty()){ etTo.setError("Required"); etTo.requestFocus(); return; }
        if (subject.isEmpty()){ etSubject.setError("Required"); etSubject.requestFocus(); return; }
        if (body.isEmpty()){ etBody.setError("Required"); etBody.requestFocus(); return; }

        btnSend.setEnabled(false); progress.setVisibility(View.VISIBLE);
        vm.send(to,subject,body,(ok,msg)->{
            runOnUiThread(()->{
                btnSend.setEnabled(true); progress.setVisibility(View.GONE);
                if (!ok){ Toast.makeText(this,"Send failed: "+msg,Toast.LENGTH_SHORT).show(); return; }
                Toast.makeText(this,"Sent",Toast.LENGTH_SHORT).show();
                setResult(RESULT_OK); finish();
            });
        });
    }
}

