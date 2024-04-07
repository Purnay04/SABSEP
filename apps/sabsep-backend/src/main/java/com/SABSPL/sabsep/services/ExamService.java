package com.SABSPL.sabsep.services;

import com.SABSPL.sabsep.models.Exam.ExamAttempt;
import com.SABSPL.sabsep.models.Question;
import com.SABSPL.sabsep.repository.ExamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ExamService {
    private final ExamRepository examRepository;
    private final QuestionsService questionsService;

    public void addAttempt(ExamAttempt examAttempt){
        examRepository.save(examAttempt);
    }

    public Page<ExamAttempt> getAllExamAttempts(Optional<Integer> page, Optional<Integer> size,Optional<String> sortBy){
        return examRepository.findAll(
                PageRequest.of(
                        page.orElse(0),
                        size.orElse(20),
                        Sort.Direction.ASC,
                        sortBy.orElse("id")
                ));
    }

    public double calculateScore(HashMap<String,ArrayList<String>> examAttemptAnswers) throws Exception {
        float totalQuestions = examAttemptAnswers.size();
        double totalCorrectAnswers = 0d;
        for (Map.Entry<String, ArrayList<String>> entry : examAttemptAnswers.entrySet()) {
            String questionId = entry.getKey();
            ArrayList<String> answers = entry.getValue();
            Optional<Question> optionalQuestion = questionsService.getQuestionById(questionId);
            if (optionalQuestion.isEmpty()) throw new Exception("Question Not Found"); // TODO: HANDLE IT PROPERLY;
            ArrayList<String> originalAnswers = optionalQuestion.get().getAnswers();
            float correctAnswersForCurrentQuestion = answers.stream().filter(ele -> originalAnswers.stream().anyMatch(crt->crt.equals(ele))).toArray().length;
            float totalCorrectOptionsForCurrentQuestion = originalAnswers.size();

//            When only 2 multiple options are to be selected but user selects 3 or 4
            float extraOptionsSelected = Math.max(0,answers.size() - originalAnswers.size());
            if (extraOptionsSelected>0) correctAnswersForCurrentQuestion-=extraOptionsSelected;
            double currentQuestionScore = correctAnswersForCurrentQuestion / totalCorrectOptionsForCurrentQuestion;
            totalCorrectAnswers+=currentQuestionScore;
        }
        return totalCorrectAnswers/totalQuestions;
    }

    public ExamAttempt getExamAttemptById(String id){
        return examRepository.findById(id).orElseThrow();
    }

    public Optional<ExamAttempt> getOptionalExamAttemptByEmail(String email){
        return examRepository.findByEmail(email);
    }

    public ExamAttempt getExamAttemptByEmail(String email) throws Exception {
        Optional<ExamAttempt> optionalExamAttempt = examRepository.findByEmail(email);
        if (optionalExamAttempt.isEmpty())  throw new Exception("Exam Attempt Not Found");
        return optionalExamAttempt.get();
    }

    public void removeAttempt(String id){
        examRepository.deleteById(id);
    }
}
