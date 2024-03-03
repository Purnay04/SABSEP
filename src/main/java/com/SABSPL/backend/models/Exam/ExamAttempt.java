package com.SABSPL.backend.models.Exam;

import lombok.Data;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;

@Data
@Document("attempts")
public class ExamAttempt {
    @Id private String id;
    @CreatedBy
    private String email;
    @CreatedDate
    private Date attempted_date;
    private double score;
    private ArrayList<ExamAttemptAnswer> answers;
}

