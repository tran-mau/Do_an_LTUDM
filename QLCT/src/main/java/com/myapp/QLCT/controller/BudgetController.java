package com.myapp.QLCT.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.myapp.QLCT.dto.request.BudgetCreateRequest;
import com.myapp.QLCT.entity.Budget;
import com.myapp.QLCT.entity.Category;
import com.myapp.QLCT.service.BudgetService;
import com.myapp.QLCT.service.CategoryService;

@RestController
@RequestMapping("/api/budgets")
public class BudgetController {
    @Autowired
    private BudgetService budgetService;
    private CategoryService categoryService;

    @PostMapping("/create")
    public Budget createBudget(@RequestBody BudgetCreateRequest request) {
        return budgetService.createBudget(request);
    }
    @PostMapping("/hello")
    public Category getCategoryByName(@RequestBody String name) {
        return categoryService.getCategoryByName(name);
    }
}
