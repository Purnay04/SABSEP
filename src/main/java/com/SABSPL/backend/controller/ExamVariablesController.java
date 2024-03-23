package com.SABSPL.backend.controller;

import com.SABSPL.backend.exceptions.ValidationException;
import com.SABSPL.backend.models.ExamVariables;
import com.SABSPL.backend.services.ExamVariableService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/admin/variables")
public class ExamVariablesController {

    private final ExamVariableService examVariableService;

    @GetMapping("")
    public ResponseEntity<?> getExamVariables(){
        return ResponseEntity.ok(examVariableService.getAllExamVariables());
    }

    @PostMapping("")
    public ResponseEntity<?> setExamVariables(@RequestBody ExamVariables examVariables){
        try {
            examVariableService.saveExamVariables(examVariables);
        } catch (ValidationException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    Map.of("ErrorMsg", e.getMessage())
            );
        } catch (Exception e){
            return ResponseEntity.internalServerError().body("");
        }
        return ResponseEntity.status(200).body("");
    }
}
