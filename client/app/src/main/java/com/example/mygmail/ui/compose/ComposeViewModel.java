package com.example.mygmail.ui.compose;

import android.app.Application;
import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;
import com.example.mygmail.data.MailRepository;
import com.example.mygmail.data.RepositoryProvider;

public class ComposeViewModel extends AndroidViewModel {
    private final MailRepository repo;
    public ComposeViewModel(@NonNull Application app){ super(app); repo = RepositoryProvider.mailRepository(app); }
    public void send(String to,String subject,String body, MailRepository.SimpleCallback cb){ repo.send(to,subject,body,cb); }
}
