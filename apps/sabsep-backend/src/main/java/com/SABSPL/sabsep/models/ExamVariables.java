package com.SABSPL.sabsep.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.HashMap;

@Data
@Document("exam_variables")
public class ExamVariables {

    @Id
    private String id;
    private int totalMarks;
    private HashMap<String,Integer> categories;
    private float duration;
}
