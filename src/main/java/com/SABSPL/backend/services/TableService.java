package com.SABSPL.backend.services;

import com.SABSPL.backend.constants.GridName;
import com.SABSPL.backend.dto.PageListView;
import com.SABSPL.backend.models.FilterRequest;
import com.SABSPL.backend.repository.ColumnRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.stereotype.Service;

import java.util.Locale;

@Service
@RequiredArgsConstructor
public class TableService {

    private final CandidateService candidateService;
    private final ColumnRepository columnRepository;
    private final QuestionsService questionsService;

    public PageListView getRowData(String gridName, Integer page, Integer size, String sortBy,FilterRequest filterRequest) {
        PageListView view = new PageListView();
        var splitSortBy = sortBy.split(",");
        var sort = splitSortBy[0];
        var direction = splitSortBy.length>1?splitSortBy[1]:"asc";
        Pageable pageable = PageRequest.of(page,
                size,
                Sort.by(Sort.Direction.valueOf(direction.toUpperCase(Locale.ROOT)),sort)
        );
        if (filterRequest.getKey()==null || filterRequest.getValue()==null) {
            filterRequest.setKey("");
            filterRequest.setValue("");
        }
        switch(GridName.valueOf(gridName)) {
            case APPLIED_USERS:
                view.setRowData(candidateService.getAllCandidates(pageable));
                break;
            case CATEGORY_LIST:
                view.setRowData(questionsService.getAllCategories(pageable));
                break;
            case QUESTIONS_LIST:
                view.setRowData(questionsService.getAllQuestions(pageable,filterRequest));
        }
        return view;
    }

    public PageListView getColumnInfo(String gridName){
        PageListView view = new PageListView();
        view.setColumnInfo(columnRepository.findAllByGridNameOrderByOrder(GridName.valueOf(gridName)));
        return view;
    }

}
