package com.SABSPL.sabsep.repository;

import com.SABSPL.sabsep.models.ExamVariables;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ExamVariablesRepository extends MongoRepository<ExamVariables,String> {
}
