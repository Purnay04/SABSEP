package com.SABSPL.backend.services;

import com.SABSPL.backend.constants.GridName;
import com.SABSPL.backend.dto.PageListView;
import com.SABSPL.backend.repository.ColumnRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TableService {

    private final CandidateService candidateService;
    private final ColumnRepository columnRepository;
    private final QuestionsService questionsService;

    public PageListView getRowData(String gridName, Integer page, Integer size, String sortBy) {
        PageListView view = new PageListView();
        Pageable pageable = PageRequest.of(page,size);
        switch(GridName.valueOf(gridName)) {
            case APPLIED_USERS:
                view.setRowData(candidateService.getAllCandidates(pageable,sortBy));
                break;
            case CATEGORY_LIST:
                view.setRowData(questionsService.getAllCategories(pageable));
                break;
        }
        return view;
    }

    public PageListView getColumnInfo(String gridName){
        PageListView view = new PageListView();
        view.setColumnInfo(columnRepository.findAllByGridNameOrderByOrder(GridName.valueOf(gridName)));
        return view;
    }
}
