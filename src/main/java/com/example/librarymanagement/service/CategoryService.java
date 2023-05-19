package com.example.librarymanagement.service;

import com.example.librarymanagement.entity.CategoryEntity;
import com.example.librarymanagement.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;

public interface CategoryService {
    CategoryEntity findByTitle(String title);
}
