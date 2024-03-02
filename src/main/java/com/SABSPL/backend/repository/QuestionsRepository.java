package com.SABSPL.backend.repository;

import com.SABSPL.backend.models.Question;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface QuestionsRepository extends MongoRepository<Question,String> {
}
