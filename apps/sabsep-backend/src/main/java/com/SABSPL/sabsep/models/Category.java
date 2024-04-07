package com.SABSPL.sabsep.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
@Document("categories")
public class Category {
    @Id
    private String id;
    private String title;
    private String validator;
}
