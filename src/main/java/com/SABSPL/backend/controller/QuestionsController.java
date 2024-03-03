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
@RequestMapping("/api/questions")
public class QuestionsController {
    private final QuestionsService questionsService;

    @GetMapping("/random")
    public ResponseEntity<?> getQuestions(@RequestParam Optional<String> category){
        return ResponseEntity.ok(questionsService.getRandomNQuestions(5,category.orElse(null)));
    }

    @PostMapping("/add")
    public ResponseEntity<?> addQuestion(@RequestBody Question question){
        questionsService.saveQuestion(question);
        return ResponseEntity.status(HttpStatus.CREATED).body("Question Added.");
    }
}
