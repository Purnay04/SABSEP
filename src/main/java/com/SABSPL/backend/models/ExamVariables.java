package com.SABSPL.backend.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Data
@Document("examVariables")
public class ExamVariables {

    @Id
    private String id;
    private int totalMarks;
    private ArrayList<String> categories;
    private int numberOfQuestions;
}
