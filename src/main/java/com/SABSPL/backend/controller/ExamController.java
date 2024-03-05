package com.SABSPL.backend.controller;

import com.SABSPL.backend.models.Exam.ExamAttempt;
import com.SABSPL.backend.services.ExamService;
import com.SABSPL.backend.services.QuestionsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.Optional;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/exam")
public class ExamController {
    private final ExamService examService;
    private final QuestionsService questionsService;
    private ScheduledExecutorService scheduledExecutorService;
    final double THRESHOLD = 0.5d; //50%
    final int totalExamDuration = 20;
    final int NUMBER_OF_QUESTIONS_FOR_EXAM = 20;

    @GetMapping("/attempts/all")
    public ResponseEntity<?> getAllExamAttempts(@RequestParam Optional<Integer> page,
                                                @RequestParam Optional<Integer> size,
                                                @RequestParam Optional<String> sortBy){
        return ResponseEntity.ok(examService.getAllExamAttempts(page,size,sortBy));
    }

    @PostMapping("/start")
    public ResponseEntity<?> startExam(HttpServletRequest request){
        String email = (String) request.getAttribute("email");
        Optional<ExamAttempt> optionalExamAttempt = examService.getExamAttemptByEmail(email);
        if (optionalExamAttempt.isPresent()){
            ExamAttempt examAttempt = optionalExamAttempt.get();

            // USER LOGGED OUT AND IS ATTEMPTING
            if (examAttempt.getAnswers()==null) return ResponseEntity.ok(examAttempt);

            // WHEN USER HAS PASSED THE EXAM
            if (examAttempt.getScore()>THRESHOLD){
                return ResponseEntity.ok("Already Attempted.");
            }

            // USER FAILED
            LocalDate date = examAttempt.getEndTime().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
            date = date.plusDays(90);
            return ResponseEntity.ok("Can be attempted again on "+date.format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));
        }
        ExamAttempt examAttempt = new ExamAttempt();
        var startTime = System.currentTimeMillis();
        int totalTime = 60000*totalExamDuration;
        long endTime =  startTime + totalTime;
        examAttempt.setEndTime(new Date(endTime));
        examAttempt.setQuestions(questionsService.getRandomNQuestions(NUMBER_OF_QUESTIONS_FOR_EXAM,null));
        examAttempt.setAnswers(null);
        examService.addAttempt(examAttempt);
        scheduledExecutorService = Executors.newScheduledThreadPool(1);
        scheduledExecutorService.schedule(()->examFinishedScheduler(examAttempt.getId()),32, TimeUnit.MINUTES);
        scheduledExecutorService.shutdown();
        return ResponseEntity.status(HttpStatus.CREATED).body(examAttempt);
    }

    // SCHEDULED AFTER 32 MINUTES
    // TO EVALUATE SCORE
    // IF FAILED SCHEDULE NEXT ATTEMPT AFTER 90 DAYS
    public void examFinishedScheduler(String id){
        try{
            ExamAttempt examAttempt = examService.getExamAttemptById(id);
            if (examAttempt.getAnswers()==null){
                examAttempt.setScore(0);
            }
            else{
                examAttempt.setScore(examService.calculateScore(examAttempt.getAnswers()));
            }
            examAttempt.setQuestions(null);
            examService.addAttempt(examAttempt);
            if (examAttempt.getScore()>THRESHOLD){
                scheduledExecutorService.schedule(()->removeExamRecordForNextAttempt(examAttempt.getId()),90, TimeUnit.DAYS);
            }
        }catch(Exception e){
            System.out.println(e.getMessage());
        }
    }

    // CLEAR THE CURRENT RECORD
    public void removeExamRecordForNextAttempt(String id){
        try{
            examService.removeAttempt(id);
        }catch(Exception e){
            System.out.println(e.getMessage());
        }
    }
}
