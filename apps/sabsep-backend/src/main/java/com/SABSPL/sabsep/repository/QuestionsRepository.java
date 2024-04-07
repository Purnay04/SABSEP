package com.SABSPL.sabsep.repository;

import com.SABSPL.sabsep.dto.gridviews.QuestionView;
import com.SABSPL.sabsep.models.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface QuestionsRepository extends MongoRepository<Question,String> {
    long countByCategory(String category);
}
