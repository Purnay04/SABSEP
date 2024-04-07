package com.SABSPL.sabsep.controller;

import com.SABSPL.sabsep.exceptions.ValidationException;
import com.SABSPL.sabsep.models.ExamVariables;
import com.SABSPL.sabsep.services.ExamVariableService;
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
