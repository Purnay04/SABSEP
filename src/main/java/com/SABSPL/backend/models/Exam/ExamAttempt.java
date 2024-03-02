package com.SABSPL.backend.models.Exam;

import lombok.Data;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Data
@Document("attempts")
public class ExamAttempt {
    @Id private String id;
    @CreatedBy
    private String email;
    @CreatedDate
    private String attempted_date;
    private String score;
    private ArrayList<ExamAttemptAnswer> answers;
}

