package com.example.mygmail;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import com.example.mygmail.net.ApiClient;
import com.example.mygmail.net.ApiService;
import com.google.android.material.materialswitch.MaterialSwitch;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LoginActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle b) {
        super.onCreate(b);
        androidx.appcompat.app.AppCompatDelegate.setDefaultNightMode(
                Prefs.isDark(this)
                        ? androidx.appcompat.app.AppCompatDelegate.MODE_NIGHT_YES
                        : androidx.appcompat.app.AppCompatDelegate.MODE_NIGHT_NO
        );
        setContentView(R.layout.activity_login);

        MaterialSwitch sw = findViewById(R.id.switchDark);
        sw.setChecked(Prefs.isDark(this));

        sw.setOnCheckedChangeListener((buttonView, isChecked) -> {
            Prefs.setDark(this, isChecked);
            androidx.appcompat.app.AppCompatDelegate.setDefaultNightMode(
                    isChecked
                            ? androidx.appcompat.app.AppCompatDelegate.MODE_NIGHT_YES
                            : androidx.appcompat.app.AppCompatDelegate.MODE_NIGHT_NO
            );
        });

        EditText etId = findViewById(R.id.etIdentifier);
        EditText etPw = findViewById(R.id.etPassword);
        Button btn = findViewById(R.id.btnLogin);
        findViewById(R.id.tvCreateAccount).setOnClickListener(v ->
                startActivity(new Intent(this, RegisterActivity.class))
        );
        findViewById(R.id.btnRunOnPhone).setOnClickListener(v -> {
            Prefs.setRunOnPhone(true);
            Toast.makeText(this, "Running on phone mode enabled", Toast.LENGTH_SHORT).show();
        });

        btn.setOnClickListener(v -> {
            String id = etId.getText().toString().trim();
            String pw = etPw.getText().toString();

            ApiService api = ApiClient.get(this).create(ApiService.class);
            api.login(new ApiService.LoginReq(id, pw))
                    .enqueue(new Callback<ApiService.LoginRes>() {
                        @Override
                        public void onResponse(Call<ApiService.LoginRes> c, Response<ApiService.LoginRes> r) {
                            if (!r.isSuccessful() || r.body() == null) {
                                Toast.makeText(LoginActivity.this, "Login failed: " + r.code()+" this user doesn't exist", Toast.LENGTH_SHORT).show();
                                return;
                            }
                            Prefs.saveToken(LoginActivity.this, r.body().token, r.body().userId);

                            startActivity(new Intent(LoginActivity.this, MainActivity.class));
                            finish();
                        }

                        @Override
                        public void onFailure(Call<ApiService.LoginRes> c, Throwable t) {
                           Toast.makeText(LoginActivity.this, "Network error: " + t.getMessage(), Toast.LENGTH_SHORT).show();
                        }
                    });
        });
    }
}
