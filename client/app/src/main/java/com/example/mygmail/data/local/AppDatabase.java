package com.example.mygmail.data.local;

import android.content.Context;
import androidx.room.Database;
import androidx.room.Room;
import androidx.room.RoomDatabase;
import androidx.room.TypeConverters;

import com.example.mygmail.data.local.converters.StringListConverter;
import com.example.mygmail.data.local.dao.MailDao;
import com.example.mygmail.data.local.entity.MailEntity;

@Database(entities = {MailEntity.class}, version = 1, exportSchema = false)
@TypeConverters({StringListConverter.class})
public abstract class AppDatabase extends RoomDatabase {
    public abstract MailDao mailDao();
    private static volatile AppDatabase INSTANCE;
    public static AppDatabase get(Context ctx){
        if (INSTANCE==null){
            synchronized (AppDatabase.class){
                if (INSTANCE==null){
                    INSTANCE = Room.databaseBuilder(ctx.getApplicationContext(),
                            AppDatabase.class, "mygmail.db").build();
                }
            }
        }
        return INSTANCE;
    }
}
