package com.SABSPL.sabsep.repository;


import com.SABSPL.sabsep.models.Category;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CategoryRepository extends MongoRepository<Category,String> {
    boolean existsByValidator(String validator);
}
