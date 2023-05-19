package com.example.librarymanagement.controller;

import com.example.librarymanagement.entity.CategoryEntity;
import com.example.librarymanagement.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("")
    public List<CategoryEntity> getAll() {
        return categoryService.getAll();
    }

    @PostMapping("/create")
    public CategoryEntity create(
            @RequestParam String title
    ) {
        return categoryService.create(title);
    }
}
