package com.SABSPL.backend.controller;

import com.SABSPL.backend.models.Exam.ExamAttempt;
import com.SABSPL.backend.services.ExamService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/exam")
public class ExamController {
    private final ExamService examService;

    @GetMapping("/attempts/all")
    public ResponseEntity<?> getAllExamAttempts(@RequestParam Optional<Integer> page,
                                                @RequestParam Optional<Integer> size,
                                                @RequestParam Optional<String> sortBy,
                                                HttpServletRequest request){
        return ResponseEntity.ok(examService.getAllBlogs(page,size,sortBy));
    }

    @PostMapping("/add")
    public ResponseEntity<?> addExamAttempt(@RequestBody ExamAttempt examAttempt) throws Exception {
        examAttempt.setScore(examService.calculateScore(examAttempt.getAnswers()));
        examService.addAttempt(examAttempt);
        return ResponseEntity.status(HttpStatus.CREATED).body("Exam Completed.");
    }

}
