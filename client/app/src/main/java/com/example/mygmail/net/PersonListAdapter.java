package com.example.mygmail.net;

import com.example.mygmail.net.ApiService.Person;
import com.google.gson.*;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

public class PersonListAdapter implements JsonDeserializer<List<Person>> {
    @Override
    public List<Person> deserialize(JsonElement json, Type typeOfT,
                                    JsonDeserializationContext ctx) throws JsonParseException {
        List<Person> out = new ArrayList<>();
        if (json == null || json.isJsonNull()) return out;

        if (json.isJsonArray()) {
            for (JsonElement e : json.getAsJsonArray()) {
                out.add(ctx.deserialize(e, Person.class));
            }
        } else if (json.isJsonObject()) {
            out.add(ctx.deserialize(json, Person.class));
        } else {
            throw new JsonParseException("Unexpected JSON for 'to'");
        }
        return out;
    }
}
