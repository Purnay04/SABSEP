package com.SABSPL.backend.services;

import com.SABSPL.backend.models.Exam.ExamAttempt;
import com.SABSPL.backend.models.Exam.ExamAttemptAnswer;
import com.SABSPL.backend.models.Question;
import com.SABSPL.backend.repository.ExamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ExamService {
    private final ExamRepository examRepository;
    private final QuestionsService questionsService;

    public void addAttempt(ExamAttempt examAttempt){
        examRepository.save(examAttempt);
    }

    public Page<ExamAttempt> getAllBlogs(Optional<Integer> page, Optional<Integer> size,Optional<String> sortBy){
        return examRepository.findAll(
                PageRequest.of(
                        page.orElse(0),
                        size.orElse(20),
                        Sort.Direction.ASC,
                        sortBy.orElse("id")
                ));
    }

    public double calculateScore(ArrayList<ExamAttemptAnswer> examAttemptAnswerList) throws Exception {
        float totalQuestions = examAttemptAnswerList.size();
        double totalCorrectAnswers = 0d;
        for (ExamAttemptAnswer examAttemptAnswer:examAttemptAnswerList) {
            Optional<Question> optionalQuestion = questionsService.getQuestionById(examAttemptAnswer.getQuestionId());
            if (optionalQuestion.isEmpty()) throw new Exception("Question Not Found"); // TODO: ADD CUSTOM EXCEPTION
            ArrayList<String> answers = (ArrayList<String>) examAttemptAnswer.getAnswer();
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
}
