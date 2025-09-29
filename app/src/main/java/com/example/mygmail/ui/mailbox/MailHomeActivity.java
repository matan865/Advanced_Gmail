package com.example.mygmail.ui.mailbox;

import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import androidx.appcompat.widget.SearchView;
import android.widget.Toast;

import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.mygmail.ComposeActivity;
import com.example.mygmail.LoginActivity;
import com.example.mygmail.MailAdapter;
import com.example.mygmail.MailDetailActivity;
import com.example.mygmail.Prefs;
import com.example.mygmail.R;
import com.example.mygmail.data.local.entity.MailEntity;
import com.example.mygmail.net.ApiService;
import com.example.mygmail.ui.mailbox.MailListViewModel;
import com.google.android.material.appbar.MaterialToolbar;
import com.google.android.material.navigation.NavigationView;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class MailHomeActivity extends AppCompatActivity {

    private DrawerLayout drawer;
    private NavigationView nav;
    private MailListViewModel vm;
    private MailAdapter adapter;

    @Override protected void onCreate(Bundle b) {
        super.onCreate(b);
        setContentView(R.layout.activity_mail_home);

        if (Prefs.token(this) == null) {
            startActivity(new Intent(this, LoginActivity.class));
            finish(); return;
        }

        MaterialToolbar tb = findViewById(R.id.toolbar);
        setSupportActionBar(tb);
        Objects.requireNonNull(getSupportActionBar()).setDisplayShowTitleEnabled(false);
        tb.setTitle(null);

        drawer = findViewById(R.id.drawer);
        nav = findViewById(R.id.nav);

        ActionBarDrawerToggle toggle =
                new ActionBarDrawerToggle(this, drawer, tb,
                        R.string.nav_open, R.string.nav_close);
        toggle.setDrawerIndicatorEnabled(true);
        drawer.addDrawerListener(toggle);
        toggle.syncState();

        RecyclerView rv = findViewById(R.id.recycler);
        rv.setLayoutManager(new LinearLayoutManager(this));
        adapter = new MailAdapter();
        rv.setAdapter(adapter);

        vm = new ViewModelProvider(this).get(MailListViewModel.class);
        vm.mails().observe(this, list -> adapter.setMails(toDtoLike(list)));
        vm.setLabel(MailListViewModel.DEFAULT_LABEL);

        nav.setNavigationItemSelectedListener(item -> {
            int id = item.getItemId();
            String label = null;

            if (id == R.id.nav_inbox)       label = "Inbox";
            else if (id == R.id.nav_sent)   label = "Sent";
            else if (id == R.id.nav_drafts) label = "Drafts";
            else if (id == R.id.nav_spam)   label = "Spam";
            else if (id == R.id.nav_trash)  label = "Trash";
            else if (id == R.id.nav_logout) {
                Prefs.clearAuth(this);
                startActivity(new Intent(this, LoginActivity.class));
                finish();
                return true;
            }

            if (label != null) {
                vm.setLabel(label);
                item.setChecked(true);
                drawer.closeDrawers();
            }
            return true;
        });

        findViewById(R.id.fabCompose)
                .setOnClickListener(v -> startActivity(new Intent(this, ComposeActivity.class)));

        adapter.setOnMailDelete((mail, pos) ->
                vm.moveToTrash(mail.id, (ok, msg) ->
                        runOnUiThread(() -> {
                            if (!ok) Toast.makeText(this, "Trash failed: "+msg, Toast.LENGTH_SHORT).show();
                        })));

        adapter.setOnMailSpam((mail, pos) -> {
            vm.moveToSpam(mail.id, (ok, msg) -> runOnUiThread(() -> {
                if (!ok) Toast.makeText(this, "Spam failed: " + msg, Toast.LENGTH_SHORT).show();
            }));
        });

        adapter.setOnMailDrafts((mail, pos) -> {
            vm.moveToDrafts(mail.id, (ok, msg) -> runOnUiThread(() -> {
                if (!ok) Toast.makeText(this, "Draft failed: " + msg, Toast.LENGTH_SHORT).show();
            }));
        });

        adapter.setOnMailClick((mail, pos) -> {
            Intent i = new Intent(this, MailDetailActivity.class);
            i.putExtra("mail_id", mail.id);
            startActivity(i);
        });


    }

    private List<ApiService.MailDto> toDtoLike(List<MailEntity> es) {
        List<ApiService.MailDto> out = new ArrayList<>();
        if (es == null) return out;
        for (MailEntity e : es) {
            ApiService.MailDto d = new ApiService.MailDto();
            d.id = e.id; d.subject = e.subject; d.body = e.body; d.date = e.date; d.read = e.read;
            ApiService.Person p = new ApiService.Person();
            p.name = e.fromName; p.email = e.fromEmail;
            d.from = p;
            out.add(d);
        }
        return out;
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu_mail_home, menu);

        MenuItem item = menu.findItem(R.id.action_search);
        SearchView sv = (SearchView) item.getActionView();
        sv.setQueryHint(getString(R.string.search));

        sv.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
            @Override public boolean onQueryTextSubmit(String q) {
                vm.setQuery(q);
                sv.clearFocus();
                return true;
            }
            @Override public boolean onQueryTextChange(String q) {
                vm.setQuery(q);
                return true;
            }
        });
        item.setOnActionExpandListener(new MenuItem.OnActionExpandListener() {
            @Override public boolean onMenuItemActionExpand(MenuItem menuItem) { return true; }
            @Override public boolean onMenuItemActionCollapse(MenuItem menuItem) {
                vm.setQuery("");
                return true;
            }
        });

        return true;
    }

}
