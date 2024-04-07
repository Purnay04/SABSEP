package com.SABSPL.sabsep.controller;

import com.SABSPL.sabsep.models.Category;
import com.SABSPL.sabsep.services.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
    public ResponseEntity<?> add(@RequestBody Category category){
        if(!categoryService.add(category))  return ResponseEntity.badRequest().body("Category Already Exists.");
        return ResponseEntity.status(201).body("");
    }
}
