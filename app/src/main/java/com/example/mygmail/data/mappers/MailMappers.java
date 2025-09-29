package com.example.mygmail.data.mappers;

import com.example.mygmail.data.local.entity.MailEntity;
import com.example.mygmail.net.ApiService;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public final class MailMappers {
    private MailMappers(){}

    public static MailEntity dtoToEntity(ApiService.MailDto d){
        String fromName  = (d.from != null) ? d.from.name  : null;
        String fromEmail = (d.from != null) ? d.from.email : null;

        List<String> labels = (d.labels != null) ? new ArrayList<>(d.labels) : new ArrayList<>();
        return new MailEntity(d.id, d.subject, d.body, d.date, d.read, fromName, fromEmail, labels);
    }
}
