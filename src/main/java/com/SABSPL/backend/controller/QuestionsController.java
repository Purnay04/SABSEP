package com.SABSPL.backend.controller;

import com.SABSPL.backend.models.Question;
import com.SABSPL.backend.services.QuestionsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/admin/questions")
public class QuestionsController {
    private final QuestionsService questionsService;

    @PostMapping("/add")
    public ResponseEntity<?> addQuestion(@RequestBody Question question){
        questionsService.saveQuestion(question);
        return ResponseEntity.status(HttpStatus.CREATED).body("Question Added.");
    }
}
