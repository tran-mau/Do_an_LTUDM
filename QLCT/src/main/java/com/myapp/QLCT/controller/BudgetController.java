package com.myapp.QLCT.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.myapp.QLCT.dto.request.BudgetCreateRequest;
import com.myapp.QLCT.entity.Budget;
import com.myapp.QLCT.service.BudgetService;

@RestController
@RequestMapping("/api/budgets")
public class BudgetController {
    @Autowired
    private BudgetService budgetService;

    @PostMapping("/create")
    public Budget createBudget(@RequestBody BudgetCreateRequest request) {
        return budgetService.createBudget(request);
    }
    @GetMapping("/hello")
    public String hello() {
        return "Hello, World!";
    }
}
