package com.SABSPL.backend.controller;

import com.SABSPL.backend.models.Exam.ExamAttempt;
import com.SABSPL.backend.services.ExamService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/exam")
public class ExamController {
    private final ExamService examService;

    @GetMapping("/attempts/all")
    public ResponseEntity<?> getAllExamAttempts(@RequestParam Optional<Integer> page,
                                                @RequestParam Optional<Integer> size,
                                                @RequestParam Optional<String> sortBy){
        return ResponseEntity.ok(examService.getAllBlogs(page,size,sortBy));
    }

    @PostMapping("/add")
    public ResponseEntity<?> addExamAttempt(@RequestBody ExamAttempt examAttempt){
        examService.addAttempt(examAttempt);
        return ResponseEntity.ok(HttpStatus.CREATED);
    }
}
