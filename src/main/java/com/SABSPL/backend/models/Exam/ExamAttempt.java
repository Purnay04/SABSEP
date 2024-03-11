package com.SABSPL.backend.models.Exam;

import com.SABSPL.backend.dto.QuestionDTO;
import lombok.Data;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

@Data
@Document("attempts")
public class ExamAttempt {
    @Id private String id;
    @CreatedBy
    private String email;
    @CreatedDate
    private Date startTime;
    private Date endTime;
    private double score;
    private List<QuestionDTO> questions;
    private HashMap<String,ArrayList<String>> questionsAndAnswers;
}

