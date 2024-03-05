package com.SABSPL.backend.repository;

import com.SABSPL.backend.models.Exam.ExamAttempt;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ExamRepository extends MongoRepository<ExamAttempt,String> {
    Page<ExamAttempt> findAllByAnswersIsNotNull(Pageable pageable);
    boolean existsByEmail(String email);
    Optional<ExamAttempt> findByEmail(String email);
}
