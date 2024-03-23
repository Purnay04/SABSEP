package com.SABSPL.backend.dto.gridviews;

import com.SABSPL.backend.dto.RowDataView;
import lombok.Data;

@Data
public class CategoryView extends RowDataView {
    private String name;
    private int totalNumberOfQuestions;
    private int numberOfQuestionsInExam;
}
