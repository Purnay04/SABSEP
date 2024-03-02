package com.SABSPL.backend.repository;

import com.SABSPL.backend.models.Exam.ExamAttempt;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ExamRepository extends MongoRepository<ExamAttempt,String> {

}
