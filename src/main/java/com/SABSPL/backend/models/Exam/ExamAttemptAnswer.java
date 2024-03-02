package com.SABSPL.backend.models.Exam;

import lombok.Data;
import lombok.NonNull;

import java.util.List;

@Data
public class ExamAttemptAnswer {
    @NonNull
    private String questionId;

    @NonNull
    private List<String> answer;
}
