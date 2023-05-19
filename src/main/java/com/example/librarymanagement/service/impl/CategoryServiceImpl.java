package com.example.librarymanagement.service.impl;

import com.example.librarymanagement.entity.CategoryEntity;
import com.example.librarymanagement.repository.CategoryRepository;
import com.example.librarymanagement.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public CategoryEntity findByTitle(String title) {
        return categoryRepository.findByTitle(title);
    }

    @Override
    public CategoryEntity create(String title) {
        CategoryEntity category = new CategoryEntity();
        category.setTitle(title);
        return categoryRepository.save(category);
    }

    @Override
    public List<CategoryEntity> getAll() {
        return categoryRepository.findAll();
    }
}
