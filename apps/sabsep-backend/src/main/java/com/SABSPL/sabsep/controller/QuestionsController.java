package com.SABSPL.sabsep.controller;

import com.SABSPL.sabsep.models.Question;
import com.SABSPL.sabsep.services.QuestionsService;
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
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getQuestion(@PathVariable String id){
        Optional<Question> optionalQuestion = questionsService.getQuestionById(id);
        if (optionalQuestion.isEmpty()) return ResponseEntity.badRequest().body("");
        return ResponseEntity.ok(optionalQuestion.get());
    }
}
