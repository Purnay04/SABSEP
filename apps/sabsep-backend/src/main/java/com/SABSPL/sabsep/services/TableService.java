package com.SABSPL.sabsep.services;

import com.SABSPL.sabsep.constants.GridName;
import com.SABSPL.sabsep.dto.PageListView;
import com.SABSPL.sabsep.models.FilterRequest;
import com.SABSPL.sabsep.repository.ColumnRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
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
        List<Criteria> criteriaList = new ArrayList<>();
        HashMap<String,String> filters = filterRequest.getFilters();
        MatchOperation matchOperation  = new MatchOperation(new Criteria());
        if (filters!=null && !filters.isEmpty()){
            for (var ele: filters.entrySet()){
                criteriaList.add(Criteria.where(ele.getKey()).regex(ele.getValue().replaceAll("/","")));
            }
            matchOperation = new MatchOperation(new Criteria().andOperator(criteriaList.toArray(new Criteria[0])));
        }
        switch(GridName.valueOf(gridName)) {
            case APPLIED_USERS:
                view.setRowData(candidateService.getAllCandidates(pageable,matchOperation));
                break;
            case CATEGORY_LIST:
                view.setRowData(questionsService.getAllCategories(pageable));
                break;
            case QUESTIONS_LIST:
                view.setRowData(questionsService.getAllQuestions(pageable,matchOperation));
        }
        return view;
    }

    public PageListView getColumnInfo(String gridName){
        PageListView view = new PageListView();
        view.setColumnInfo(columnRepository.findAllByGridNameOrderByOrder(GridName.valueOf(gridName)));
        return view;
    }

}
