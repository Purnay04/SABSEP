package com.SABSPL.backend.services;

import com.SABSPL.backend.exceptions.ValidationException;
import com.SABSPL.backend.models.ExamVariables;
import com.SABSPL.backend.repository.ExamVariablesRepository;
import com.SABSPL.backend.repository.QuestionsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.regex.Pattern;

@RequiredArgsConstructor
@Service
public class ExamVariableService {
    private final ExamVariablesRepository examVariablesRepository;
    private final QuestionsRepository questionsRepository;

    public ExamVariables getAllExamVariables(){
        return examVariablesRepository.findAll().get(0);
    }

    public void saveExamVariables(ExamVariables examVariables) throws ValidationException {
        validateExamVariables(examVariables);
        examVariablesRepository.save(examVariables);
    }

    private void validateExamVariables(ExamVariables examVariables) throws ValidationException {
        var totalMarks = examVariables.getTotalMarks();
        var duration = examVariables.getDuration();

        // Validate Total Marks
        if(totalMarks <= 0) {
            throw new ValidationException("Exam total marks should be more than 0!");
        }

        if(examVariables.getCategories().entrySet().stream().anyMatch(ele-> ele.getValue()>questionsRepository.countByCategory(ele.getKey()) || ele.getValue()<0)){
            throw new ValidationException("Number of Questions per category is invalid.");
        }

        // Validate Total marks give per category
        Integer totalMarksPerCategory = examVariables.getCategories().values().stream().reduce(0, Integer::sum);
        if(totalMarksPerCategory != totalMarks) {
            throw new ValidationException("Category Questions Not Equal To Total Questions.");
        }

        // Validate Hours.
        if(!Pattern.matches("^\\d+(\\.\\d{2})?$", String.valueOf(duration)) && (duration % 1) * 100 > 59) {
            throw new ValidationException("Duration is not in valid format. Please provide it in 2.30(HH.MM) manner");
        }
    }
}
