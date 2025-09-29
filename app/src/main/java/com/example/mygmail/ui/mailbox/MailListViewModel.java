package com.example.mygmail.ui.mailbox;

import android.app.Application;
import androidx.annotation.NonNull;
import androidx.lifecycle.*;
import com.example.mygmail.data.MailRepository;
import com.example.mygmail.data.RepositoryProvider;
import com.example.mygmail.data.local.entity.MailEntity;
import java.util.List;

public class MailListViewModel extends AndroidViewModel {
    public static final String DEFAULT_LABEL = "Inbox";

    private final MailRepository repo;
    private final MutableLiveData<String> currentLabel = new MutableLiveData<>(DEFAULT_LABEL);
    private final MutableLiveData<String> query = new MutableLiveData<>("");
    private final LiveData<List<MailEntity>> mails;

    public MailListViewModel(@NonNull Application app) {
        super(app);
        repo = RepositoryProvider.mailRepository(app);

//        mails = Transformations.switchMap(currentLabel, label -> {
//            if ("Trash".equalsIgnoreCase(label)) {
//                return repo.observeTrash();
//            } else {
//                repo.refreshLabel(label);
//                return repo.observeByLabel(label);
//            }
//        });
        mails = Transformations.switchMap(query, q -> {
            if (q != null && !q.trim().isEmpty()) {
                return repo.search(q.trim());
            } else {
                return Transformations.switchMap(currentLabel, label -> {
                    if ("Trash".equalsIgnoreCase(label)) return repo.observeTrash();
                    repo.refreshLabel(label);
                    return repo.observeByLabel(label);
                });
            }
        });
    }

    public void setLabel(String label) { currentLabel.setValue(label); }
    public LiveData<List<MailEntity>> mails() { return mails; }
    public void setQuery(String q)  { query.setValue(q); }
    public void moveToTrash(String id, MailRepository.SimpleCallback cb) { repo.moveToTrash(id, cb); }
    public void moveToSpam(String id, MailRepository.SimpleCallback cb) {
        repo.moveToSpam(id, cb);
    }
    public void moveToDrafts(String id, MailRepository.SimpleCallback cb) {
        repo.moveToDrafts(id, cb);
    }
    public void deleteForever(String id, MailRepository.SimpleCallback cb) { repo.delete(id, cb); }
}
