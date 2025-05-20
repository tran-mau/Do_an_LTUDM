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
        List<Category> categories = categoryRepository.findAll();
        for (Category category : categories) {
            if (category.getName().equalsIgnoreCase(name)) {
                return category;
            }
        }
        return null; // Trả về null nếu không tìm thấy category
    }
}
