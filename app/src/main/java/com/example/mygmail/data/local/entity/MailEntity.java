package com.example.mygmail.data.local.entity;

import androidx.annotation.NonNull;
import androidx.room.Entity;
import androidx.room.PrimaryKey;
import androidx.room.TypeConverters;

import com.example.mygmail.data.local.converters.StringListConverter;

import java.util.List;

@Entity(tableName = "mails")
public class MailEntity {
    @PrimaryKey @NonNull
    public String id;

    public String subject, body, date;
    public boolean read;
    public String fromName, fromEmail;
    public boolean trashed;

    @TypeConverters(StringListConverter.class)
    public List<String> labels;

    public MailEntity(@NonNull String id, String subject, String body, String date,
                      boolean read, String fromName, String fromEmail, List<String> labels) {
        this.id = id;
        this.subject = subject;
        this.body = body;
        this.date = date;
        this.read = read;
        this.fromName = fromName;
        this.fromEmail = fromEmail;
        this.labels = labels;
        this.trashed = false;
    }
}
