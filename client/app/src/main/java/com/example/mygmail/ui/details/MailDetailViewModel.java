package com.example.mygmail.ui.details;

import android.app.Application;
import androidx.annotation.NonNull;
import androidx.lifecycle.*;
import com.example.mygmail.data.*;
import com.example.mygmail.data.local.entity.MailEntity;

public class MailDetailViewModel extends AndroidViewModel {
    private final MailRepository repo;
    public MailDetailViewModel(@NonNull Application app){ super(app); repo = RepositoryProvider.mailRepository(app); }
    public LiveData<MailEntity> mail(String id){ return repo.mailById(id); }
    public void refresh(String id){ repo.refreshMail(id); }
}
