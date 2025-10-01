package com.example.mygmail;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

public class MainActivity extends AppCompatActivity {
    private void openBox(String label){
        Intent i = new Intent(this, com.example.mygmail.ui.mailbox.MailListActivity.class);
        i.putExtra(com.example.mygmail.ui.mailbox.MailListActivity.EXTRA_LABEL, label);
        startActivity(i);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);

        if (Prefs.token(this) == null) {
            startActivity(new Intent(this, LoginActivity.class));
        } else {
            startActivity(new Intent(this, com.example.mygmail.ui.mailbox.MailHomeActivity.class));
        }
        finish();
    }

//        if (Prefs.token(this) == null) {
//            startActivity(new Intent(this, LoginActivity.class));
//            finish();
//            return;
//        }
//
//        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
//            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
//            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
//            return insets;
//        });
//
//        Button open = findViewById(R.id.btnOpenSettings);
//        open.setOnClickListener(v -> {
//            startActivity(new Intent(this, SettingsActivity.class));
//        });
//        findViewById(R.id.btnInbox).setOnClickListener(v -> openBox("Inbox"));
//        findViewById(R.id.btnSent).setOnClickListener(v -> openBox("Sent"));
//        findViewById(R.id.btnDrafts).setOnClickListener(v -> openBox("Drafts"));
//        findViewById(R.id.btnSpam).setOnClickListener(v -> openBox("Spam"));
//        findViewById(R.id.btnTrash).setOnClickListener(v -> openBox("Trash"));
}
