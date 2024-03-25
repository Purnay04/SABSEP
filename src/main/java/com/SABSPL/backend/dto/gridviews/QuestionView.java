package com.SABSPL.backend.dto.gridviews;

import com.SABSPL.backend.dto.RowDataView;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
public class QuestionView extends RowDataView {
    private String question;
    private String category;
    private boolean edit=true;
    private boolean delete=true;
}
