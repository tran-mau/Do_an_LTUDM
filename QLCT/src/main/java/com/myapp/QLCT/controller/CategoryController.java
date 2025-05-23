package com.myapp.QLCT.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.myapp.QLCT.dto.request.CategoryTotalDTO;
import com.myapp.QLCT.entity.Category;
import com.myapp.QLCT.service.CategoryService;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @GetMapping("/allcategories")
    public List<Category> getAllCategories() {
        return categoryService.getAllCategories();
    }

    @GetMapping("hello")
    public String hello() {
        return "Hello, this is a test message!";
    }

    // @PostMapping("/getCategoryByName")
    // public Category getCategoryByName(@RequestBody CategoryTotalDTO request) {
    // return categoryService.getCategoryByName(request.getName());
    // }
    @PostMapping("/getCategoryByName")
    public Category getCategoryByName(@RequestBody Map<String, String> body) {
        String name = body.get("name");
        return categoryService.getCategoryByName(name);
    }
}
