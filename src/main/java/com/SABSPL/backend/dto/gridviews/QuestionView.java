package com.SABSPL.backend.dto.gridviews;

import com.SABSPL.backend.dto.RowDataView;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
public class QuestionView extends RowDataView {
    private String id;
    private String questionInShort;
    private String category;
    private boolean edit;
    private boolean delete;
}
