package com.myapp.QLCT.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.myapp.QLCT.dto.request.BudgetCreateRequest;
import com.myapp.QLCT.dto.request.BudgetUpdateRequest;
import com.myapp.QLCT.dto.request.UserForBudgetRequest;
import com.myapp.QLCT.entity.Budget;
import com.myapp.QLCT.entity.Category;
import com.myapp.QLCT.entity.UserAccount;
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

    @PostMapping("/getbudget")
    public Budget getBudgetByCategoryAndUser(@RequestBody BudgetUpdateRequest request) {
        return budgetService.getBudgetByCategoryAndUser(request.getCategoryName(), request.getUserId());
    }

    // @PostMapping("/update")
    // public Budget updateBudget(@RequestBody BudgetUpdateRequest request) {
    // return budgetService.updateBudget(request);
    // }

    // @PostMapping("/delete")
    // public String deleteBudget(@RequestBody BudgetUpdateRequest request) {
    // return budgetService.deleteBudget(request);
    // }

    @DeleteMapping("/delete/{budgetId}")
    public ResponseEntity<Void> deleteBudget(@PathVariable Integer budgetId) {
        budgetService.deleteBudgetById(budgetId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/getall")
    public List<Budget> getAllBudgets(@RequestBody UserForBudgetRequest request) {
        return budgetService.getAllBudgetsByUserId(request.getUserId());
    }

    @PutMapping("/update/{userId}/{categoryName}")
    public Budget updateBudgetByUserAndCategory(
            @PathVariable String userId,
            @PathVariable String categoryName,
            @RequestBody BudgetUpdateRequest updatedBudgetData) {
        return budgetService.updateBudget(updatedBudgetData, userId, categoryName);
    }

    //  @GetMapping("/with-remaining")
    // public List<BudgetResponseDTO> getBudgetsWithRemaining(@RequestParam String userId) {
    //     return budgetService.getBudgetsWithRemaining(userId);
    // }

}
