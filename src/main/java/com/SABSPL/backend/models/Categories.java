package com.SABSPL.backend.models;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@RequiredArgsConstructor
@Document("categories")
public class Categories {
    @Id
    private String id;
    private String title;
}
