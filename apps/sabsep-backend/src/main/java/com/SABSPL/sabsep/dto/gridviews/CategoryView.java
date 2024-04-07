package com.SABSPL.sabsep.dto.gridviews;

import com.SABSPL.sabsep.dto.RowDataView;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.RequiredArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@RequiredArgsConstructor
@Data
public class CategoryView extends RowDataView {
    private String name;
    private int totalNumberOfQuestions;
    private int numberOfQuestionsInExam;
}
