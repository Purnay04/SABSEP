package com.SABSPL.backend.services;

import com.SABSPL.backend.dto.QuestionDTO;
import com.SABSPL.backend.models.Question;
import com.SABSPL.backend.repository.QuestionsRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;
import org.springframework.data.mongodb.core.aggregation.SampleOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Data
@Service
@RequiredArgsConstructor
public class QuestionsService {
    private final QuestionsRepository questionsRepository;
    private final MongoTemplate mongoTemplate;

    public void saveQuestion(Question question){
        questionsRepository.save(question);
    }

    public List<QuestionDTO> getRandomNQuestions(Integer n,String category){
        SampleOperation sampleOperation = Aggregation.sample(n);
        if (category==null) return mongoTemplate.aggregate(Aggregation.newAggregation(sampleOperation),"question", QuestionDTO.class).getMappedResults();
        MatchOperation matchOperation = Aggregation.match(Criteria.where("category").is(category));
        Aggregation aggregation = Aggregation.newAggregation(sampleOperation,matchOperation);
        return mongoTemplate.aggregate(aggregation,"question", QuestionDTO.class).getMappedResults();
    }

    public Optional<Question> getQuestionById(String questionId){
        return questionsRepository.findById(questionId);
    }


}
