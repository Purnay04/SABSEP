package com.SABSPL.backend.repository;


import com.SABSPL.backend.models.Category;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CategoryRepository extends MongoRepository<Category,String> {
    boolean existsByValidator(String validator);
}
