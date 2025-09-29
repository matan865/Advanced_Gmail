package com.example.mygmail.data.local.converters;

import androidx.room.TypeConverter;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class StringListConverter {
    @TypeConverter
    public static String toDb(List<String> list){
        return (list == null || list.isEmpty()) ? "" : String.join(",", list);
    }
    @TypeConverter public static List<String> fromDb(String csv){
        if (csv == null || csv.isEmpty()) return new ArrayList<>();
        return new ArrayList<>(Arrays.asList(csv.split(",")));
    }
}
