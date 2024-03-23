package com.SABSPL.backend.services;

import com.SABSPL.backend.constants.GridName;
import com.SABSPL.backend.dto.PageListView;
import com.SABSPL.backend.repository.ColumnRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TableService {

    private final CandidateService candidateService;
    private final ColumnRepository columnRepository;
    private final QuestionsService questionsService;

    public PageListView getRowData(String gridName, Optional<Integer> page, Optional<Integer> size, Optional<String> sortBy) {
        PageListView view = new PageListView();
        switch(GridName.valueOf(gridName)) {
            case APPLIED_USERS:
                view.setRowData(candidateService.getAllCandidates());
                break;
            case CATEGORY_LIST:
                view.setRowData(questionsService.getAllCategories());
                break;
        }
        return view;
    }

    public PageListView getColumnInfo(String gridName){
        PageListView view = new PageListView();
        switch(GridName.valueOf(gridName)) {
            case APPLIED_USERS:
                view.setColumnInfo(columnRepository.findAllByGridName(GridName.APPLIED_USERS));
                break;
            case CATEGORY_LIST:

                break;
        }
        return view;
    }
}
