package com.SABSPL.sabsep.services;

import com.SABSPL.sabsep.models.Category;
import com.SABSPL.sabsep.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public boolean add(Category category){
        var title = category.getTitle();
        var validator = titleToValidator(title);
        if (categoryRepository.existsByValidator(validator))  return false;
        category.setValidator(validator);
        categoryRepository.save(category);
        return true;
    }

    public List<String> getAllCategories(){
        return categoryRepository.findAll().stream().map(Category::getTitle).collect(Collectors.toList());
    }

    public String titleToValidator(String title){
        title = title.replaceAll("\\s","");
        System.out.println(title);
        return title.toUpperCase(Locale.ROOT);
    }
}
