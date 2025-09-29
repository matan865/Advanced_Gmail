package com.example.mygmail.data.local.dao;

import androidx.lifecycle.LiveData;
import androidx.room.*;
import com.example.mygmail.data.local.entity.MailEntity;
import java.util.List;

@Dao
public interface MailDao {

    @Query("SELECT * FROM mails ORDER BY date DESC")
    LiveData<List<MailEntity>> observeInbox();

    @Query("SELECT * FROM mails WHERE id=:id LIMIT 1")
    LiveData<MailEntity> observeById(String id);

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    void upsertAll(List<MailEntity> list);

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    void upsert(MailEntity e);

    @Query("DELETE FROM mails WHERE id=:id")
    void delete(String id);

    @Query("SELECT * FROM mails WHERE trashed = 0 AND labels LIKE '%' || :label || '%' ORDER BY date DESC")
    LiveData<List<MailEntity>> observeByLabel(String label);

    @Query("SELECT * FROM mails WHERE trashed = 1 ORDER BY date DESC")
    LiveData<List<MailEntity>> observeTrash();

    @Query("SELECT * FROM mails WHERE labels LIKE '%' || :label || '%' ORDER BY date DESC")
    List<MailEntity> getByLabel(String label);

    @Query("SELECT * FROM mails WHERE id=:id LIMIT 1")
    MailEntity getByIdNow(String id);
}
