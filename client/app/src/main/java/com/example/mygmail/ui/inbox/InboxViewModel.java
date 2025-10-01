package com.example.mygmail.ui.inbox;

import android.app.Application;
import androidx.annotation.NonNull;
import androidx.lifecycle.*;
import com.example.mygmail.data.*;
import com.example.mygmail.data.local.entity.MailEntity;
import java.util.List;

public class InboxViewModel extends AndroidViewModel {
    private final MailRepository repo;
    private final LiveData<List<MailEntity>> inbox;
    public InboxViewModel(@NonNull Application app){
        super(app);
        repo = RepositoryProvider.mailRepository(app);
        inbox = repo.inbox();
    }
    public LiveData<List<MailEntity>> inbox(){ return inbox; }
    public void refresh(){ repo.refreshInbox(); }
    public void delete(String id, MailRepository.SimpleCallback cb){ repo.delete(id, cb); }
}
