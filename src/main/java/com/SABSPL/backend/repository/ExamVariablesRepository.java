package com.SABSPL.backend.repository;

import com.SABSPL.backend.models.ExamVariables;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ExamVariablesRepository extends MongoRepository<ExamVariables,String> {
}
