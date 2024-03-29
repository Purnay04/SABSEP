package com.SABSPL.backend.repository;


import com.SABSPL.backend.models.Categories;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CategoryRepository extends MongoRepository<Categories,String> {
}
