package com.SABSPL.sabsep.services;
import com.SABSPL.sabsep.models.ExamVariables;
import com.SABSPL.sabsep.models.FilterRequest;
import org.jsoup.Jsoup;
import com.SABSPL.sabsep.dto.QuestionDTO;
import com.SABSPL.sabsep.dto.gridviews.CategoryView;
import com.SABSPL.sabsep.dto.gridviews.QuestionView;
import com.SABSPL.sabsep.models.Question;
import com.SABSPL.sabsep.repository.QuestionsRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;
import org.springframework.data.mongodb.core.aggregation.SampleOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Stack;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuestionsService {
    private final QuestionsRepository questionsRepository;
    private final ExamVariableService examVariableService;
    private final MongoTemplate mongoTemplate;
    private final CategoryService categoryService;

    public void saveQuestion(Question question){
        question.setQuestionInShort(Jsoup.parse(question.getQuestion()).text());
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

    public Page<CategoryView> getAllCategories(Pageable pageable){
        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.group("category").count().as("totalNumberOfQuestions"),
                Aggregation.project("totalNumberOfQuestions").and("_id").as("name")
        );
        var result = mongoTemplate.aggregate(aggregation, "question",CategoryView.class);
        var resultList = result.getMappedResults();
        var categoryList = categoryService.getAllCategories();
        var examVariables = examVariableService.getAllExamVariables();
        for (var element:resultList){
            element.setNumberOfQuestionsInExam(examVariables.getCategories().getOrDefault(element.getName(),0));
        }
        for (String category:categoryList){
            if(resultList.stream().anyMatch(ele->ele.getName().equals(category)))   continue;
            resultList.add(new CategoryView(category,0,0));
        }
        return new PageImpl<>(resultList,pageable,resultList.size());
    }

  public Page<QuestionView> getAllQuestions(Pageable pageable,MatchOperation matchOperation){
    final String COLLECTION_NAME = "question";
    Aggregation aggregation = Aggregation.newAggregation(
      matchOperation,
      Aggregation.sort(pageable.getSort()),
      Aggregation.skip(pageable.getPageSize() * pageable.getPageNumber())
    );
    var result = mongoTemplate.aggregate(aggregation,COLLECTION_NAME,Question.class).getMappedResults();
    var questionViewList = result.stream().map(ele->new QuestionView(ele.getId(),ele.getQuestionInShort(),ele.getCategory(),true,true)).collect(Collectors.toList());
    return new PageImpl<>(questionViewList,pageable,result.size());
  }

  public void deleteQuestionById(String id) throws Exception {
    Optional<Question> optionalQuestion = questionsRepository.findById(id);
    if (optionalQuestion.isEmpty())  throw new Exception("Question Not Found");
    Question question = optionalQuestion.get();
    ExamVariables examVariables = examVariableService.getAllExamVariables();
    long countByCategory = questionsRepository.countByCategory(question.getCategory());
    long categoryCountInExam = examVariables.getCategories().getOrDefault(question.getCategory(),0);
    if (categoryCountInExam>=countByCategory)    throw new RuntimeException("");
    questionsRepository.deleteById(id);
  }

}
