package com.myapp.QLCT.controller;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
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

    // @PostMapping("/create")
    // public Budget createBudget(@RequestBody BudgetCreateRequest request) {
    // return budgetService.createBudget(request);
    // }

    @PostMapping("/create")
    public ResponseEntity<?> createBudget(@RequestBody BudgetCreateRequest req) {
        if (budgetService.isOverlapping(req.getUserId(), req.getCategoryName(), req.getStartDate(), req.getEndDate())) {
            return ResponseEntity.badRequest().body("Đã có ngân sách trùng thời gian cho danh mục này");
        }

        Budget created = budgetService.createBudget(req);
        return ResponseEntity.ok(created);
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

    @PutMapping("/update/{budgetId}")
    public Budget updateBudgetByUserAndCategory(
            @PathVariable Integer budgetId,
            @RequestBody BudgetUpdateRequest updatedBudgetData) {
        return budgetService.updateBudget(updatedBudgetData, budgetId);
    }

    @GetMapping("/getamountbudget")
    public ResponseEntity<BigDecimal> getBudgetByCategory(
            @RequestParam String userId,
            @RequestParam String categoryName,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {

        BigDecimal budgetAmount = budgetService.getBudgetAmount(userId, categoryName, date);
        return ResponseEntity.ok(budgetAmount != null ? budgetAmount : BigDecimal.ZERO);
    }

    // @GetMapping("/with-remaining")
    // public List<BudgetResponseDTO> getBudgetsWithRemaining(@RequestParam String
    // userId) {
    // return budgetService.getBudgetsWithRemaining(userId);
    // }

}
