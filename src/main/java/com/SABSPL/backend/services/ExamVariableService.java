package com.SABSPL.backend.services;

import com.SABSPL.backend.models.ExamVariables;
import com.SABSPL.backend.repository.ExamVariablesRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ExamVariableService {
    private final ExamVariablesRepository examVariablesRepository;

    public ExamVariables getAllExamVariables(){
        return examVariablesRepository.findAll().get(0);
    }

    public void saveExamVariables(ExamVariables examVariables){
        examVariablesRepository.save(examVariables);
    }
}
