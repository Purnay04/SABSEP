package com.SABSPL.sabsep.repository;

import com.SABSPL.sabsep.models.Exam.ExamAttempt;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ExamRepository extends MongoRepository<ExamAttempt,String> {
    boolean existsByEmail(String email);
    Optional<ExamAttempt> findByEmail(String email);
}
