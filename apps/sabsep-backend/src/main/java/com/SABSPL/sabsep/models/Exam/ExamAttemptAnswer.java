package com.SABSPL.sabsep.models.Exam;

import lombok.Data;
import lombok.NonNull;

import java.util.ArrayList;
import java.util.List;

@Data
public class ExamAttemptAnswer {
    @NonNull
    private String questionId;

    @NonNull
    private ArrayList<String> answer;
}
