package com.SABSPL.backend.models;

import lombok.Data;
import lombok.NonNull;
import org.springframework.data.annotation.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;

@Data
@Document("question")
public class Question {
    @Id
    private String id;
    @NonNull private String question;
    @NonNull private ArrayList<String> options;
    private Boolean isMultipleChoice = false;
    @NonNull private ArrayList<String> answers;
    @NonNull private String category;
    private String questionInShort;
    @CreatedDate
    private Date created_on;

    @LastModifiedDate
    private Date modified_on;

    @CreatedBy
    private String createdByUser;

    @LastModifiedBy
    private String modifiedByUser;
}
