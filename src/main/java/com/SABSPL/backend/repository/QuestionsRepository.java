package com.SABSPL.backend.repository;

import com.SABSPL.backend.dto.gridviews.QuestionView;
import com.SABSPL.backend.models.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface QuestionsRepository extends MongoRepository<Question,String> {
    long countByCategory(String category);
}
