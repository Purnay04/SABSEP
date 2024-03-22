package com.SABSPL.backend.controller;

import com.SABSPL.backend.models.ExamVariables;
import com.SABSPL.backend.services.ExamVariableService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequiredArgsConstructor
@RequestMapping("/admin/variables")
public class ExamVariablesController {

    private final ExamVariableService examVariableService;

    @GetMapping("/")
    public ResponseEntity<?> getExamVariables(){
        return ResponseEntity.ok(examVariableService.getAllExamVariables());
    }

    @PostMapping("/")
    public ResponseEntity<?> setExamVariables(@RequestBody ExamVariables examVariables){
        examVariableService.saveExamVariables(examVariables);
        return ResponseEntity.status(200).body("");
    }
}
