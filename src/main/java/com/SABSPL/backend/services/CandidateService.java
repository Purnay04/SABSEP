package com.SABSPL.backend.services;

import com.SABSPL.backend.constants.Role;
import com.SABSPL.backend.dto.gridviews.CandidateView;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CandidateService {
    private final MongoTemplate mongoTemplate;

    List<CandidateView> getAllCandidates(){
        return mongoTemplate.aggregate(
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
                , "user",CandidateView.class).getMappedResults();
    }
}
