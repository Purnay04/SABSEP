package com.SABSPL.backend.services;

import com.SABSPL.backend.constants.Role;
import com.SABSPL.backend.dto.gridviews.CandidateView;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CandidateService {
    private final MongoTemplate mongoTemplate;

    Page<CandidateView> getAllCandidates(Pageable pageable, String sortBy){
        AggregationResults<CandidateView> aggregationResults = mongoTemplate.aggregate(
                Aggregation.newAggregation(
                        Aggregation.lookup(
                                "attempts",
                                "email",
                                "email",
                                "cd"),
                        Aggregation.match(Criteria.where("role").is(Role.ROLE_USER)),
                        Aggregation.unwind("cd"),
                        Aggregation.project("cd.score","cd.startTime","email","username","id")
                )
                , "user",CandidateView.class);
        return new PageImpl<>(aggregationResults.getMappedResults(), pageable, aggregationResults.getMappedResults().size());
    }
}
