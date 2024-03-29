package com.SABSPL.backend.services;

import com.SABSPL.backend.models.Categories;
import com.SABSPL.backend.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public void add(Categories category){
        categoryRepository.save(category);
    }

    public List<String> getAllCategories(){
        return categoryRepository.findAll().stream().map(Categories::getTitle).collect(Collectors.toList());
    }
}
