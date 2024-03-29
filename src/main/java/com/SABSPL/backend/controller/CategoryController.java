package com.SABSPL.backend.controller;

import com.SABSPL.backend.models.Categories;
import com.SABSPL.backend.services.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/admin/category")
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping("/all")
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

    @PostMapping("")
    public ResponseEntity<?> add(Categories category){
        categoryService.add(category);
        return ResponseEntity.status(201).body("");
    }
}
