package com.SABSPL.sabsep.services;

import com.SABSPL.sabsep.constants.Role;
import com.SABSPL.sabsep.dto.gridviews.CandidateView;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CandidateService {
    private final MongoTemplate mongoTemplate;

    Page<CandidateView> getAllCandidates(Pageable pageable, MatchOperation matchOperation){
        final String COLLECTION_NAME = "user";
        AggregationResults<CandidateView> aggregationResults = mongoTemplate.aggregate(
                Aggregation.newAggregation(
                        Aggregation.lookup(
                                "attempts",
                                "email",
                                "email",
                                "cd"),
                        Aggregation.match(Criteria.where("role").is(Role.ROLE_USER)),
                        Aggregation.unwind("cd"),
                        Aggregation.project("cd.score","cd.startTime","email","username","id"),
                        Aggregation.sort(pageable.getSort()),
                        Aggregation.skip(pageable.getPageSize()),
                        matchOperation
                )
                , COLLECTION_NAME,CandidateView.class);
        return new PageImpl<>(aggregationResults.getMappedResults(), pageable, aggregationResults.getMappedResults().size());
    }
}
