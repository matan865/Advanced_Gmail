package com.example.mygmail;

import android.app.DatePickerDialog;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Spinner;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.example.mygmail.net.ApiClient;
import com.example.mygmail.net.ApiService;
import com.google.android.material.textfield.TextInputLayout;

import java.util.Calendar;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class RegisterActivity extends AppCompatActivity {

    private TextInputLayout tilUsername;
    private EditText etUser, etName, etEmail, etPw, etPwConfirm, etDob;
    private Spinner spGender;
    private Button btn;
    private ImageView ivAvatar;

    @Override
    protected void onCreate(Bundle b) {
        super.onCreate(b);
        setContentView(R.layout.activity_register);

        tilUsername   = findViewById(R.id.tilUsername);
        etUser        = findViewById(R.id.etUsername);
        etName        = findViewById(R.id.etDisplayName);
        etEmail       = findViewById(R.id.etEmail);
        etPw          = findViewById(R.id.etPassword);
        etPwConfirm   = findViewById(R.id.etPasswordConfirm);
        etDob         = findViewById(R.id.etDob);
        spGender      = findViewById(R.id.spGender);
        btn           = findViewById(R.id.btnRegister);

        etUser.addTextChangedListener(new SimpleTextWatcher(s -> {
            String u = s == null ? "" : s.toString().trim();
            tilUsername.setHelperText(u.isEmpty() ? "" : "Your mail is: " + u + "@mail.com");
        }));

        etDob.setOnClickListener(v -> showDatePicker());

        spGender.setAdapter(new ArrayAdapter<>(
                this,
                android.R.layout.simple_spinner_dropdown_item,
                new String[]{"Gender", "Male", "Female", "Other"}
        ));
        spGender.setSelection(0);

        btn.setOnClickListener(v -> doRegister());
        ivAvatar = findViewById(R.id.ivAvatar);
    }

    private void showDatePicker() {
        Calendar c = Calendar.getInstance();
        new DatePickerDialog(this, (view, y, m, d) -> {
            String dd = String.format("%02d/%02d/%04d", d, (m + 1), y);
            etDob.setText(dd);
        }, c.get(Calendar.YEAR), c.get(Calendar.MONTH), c.get(Calendar.DAY_OF_MONTH)).show();
    }

    private void doRegister() {
        String u = etUser.getText().toString().trim();
        String p = etPw.getText().toString();
        String pc = etPwConfirm.getText().toString();
        String n = etName.getText().toString().trim();

        if (u.isEmpty()) { etUser.setError("Required"); etUser.requestFocus(); return; }
        if (p.isEmpty()) { etPw.setError("Required"); etPw.requestFocus(); return; }
        if (p.length() < 8) {etPw.setError("Password must be at least 8 characters");etPw.requestFocus();return;}
        if (!p.equals(pc)) { etPwConfirm.setError("Passwords do not match"); etPwConfirm.requestFocus(); return; }

        ApiService api = ApiClient.get(this).create(ApiService.class);
        String a = null;

        api.register(new ApiService.RegisterReq(u, p, n, a))
                .enqueue(new Callback<ApiService.RegisterRes>() {
                    @Override public void onResponse(Call<ApiService.RegisterRes> c, Response<ApiService.RegisterRes> r) {
                        if (!r.isSuccessful() || r.body() == null) {
                            Toast.makeText(RegisterActivity.this, "Register failed: " + r.code(), Toast.LENGTH_SHORT).show();
                            return;
                        }
                        String serverUsername = r.body().username;

                        api.login(new ApiService.LoginReq(serverUsername, p))
                                .enqueue(new Callback<ApiService.LoginRes>() {
                                    @Override public void onResponse(Call<ApiService.LoginRes> c2, Response<ApiService.LoginRes> r2) {
                                        if (r2.isSuccessful() && r2.body() != null) {
                                            Prefs.saveToken(RegisterActivity.this, r2.body().token, r2.body().userId);
                                            startActivity(new Intent(RegisterActivity.this, MainActivity.class));
                                            finish();
                                        } else {
                                            Intent i = new Intent(RegisterActivity.this, LoginActivity.class);
                                            i.putExtra("prefill_username", serverUsername);
                                            startActivity(i);
                                            finish();
                                        }
                                    }
                                    @Override public void onFailure(Call<ApiService.LoginRes> c2, Throwable t) {
                                        Intent i = new Intent(RegisterActivity.this, LoginActivity.class);
                                        i.putExtra("prefill_username", serverUsername);
                                        startActivity(i);
                                        finish();
                                    }
                                });
                    }
                    @Override public void onFailure(Call<ApiService.RegisterRes> c, Throwable t) {
                        Toast.makeText(RegisterActivity.this, "Network error: " + t.getMessage(), Toast.LENGTH_SHORT).show();
                    }
                });
    }

    private static class SimpleTextWatcher implements android.text.TextWatcher {
        private final java.util.function.Consumer<CharSequence> onChange;
        SimpleTextWatcher(java.util.function.Consumer<CharSequence> onChange){ this.onChange = onChange; }
        public void beforeTextChanged(CharSequence s,int a,int b,int c) {}
        public void onTextChanged(CharSequence s,int a,int b,int c) { onChange.accept(s); }
        public void afterTextChanged(android.text.Editable s) {}
    }
    public void onAvatarSelected(View view) {
        ImageView selectedAvatar = (ImageView) view;
        ivAvatar.setImageDrawable(selectedAvatar.getDrawable());
    }
}
