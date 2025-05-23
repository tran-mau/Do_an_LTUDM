package com.myapp.QLCT.service;

import java.util.List;
// import java.util.Locale.Category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.myapp.QLCT.entity.Category;

import com.myapp.QLCT.repository.CategoryRepository;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    public Category getCategoryByName(String name) {
    return categoryRepository.findByNameIgnoreCase(name)
        .orElse(null); 
}

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
}
