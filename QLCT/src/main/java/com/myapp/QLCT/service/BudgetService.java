package com.myapp.QLCT.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.relational.core.sql.In;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.myapp.QLCT.dto.request.BudgetCreateRequest;
import com.myapp.QLCT.dto.request.BudgetUpdateRequest;
import com.myapp.QLCT.entity.Budget;
import com.myapp.QLCT.entity.User;
import com.myapp.QLCT.entity.Category;
import com.myapp.QLCT.repository.BudgetRepository;
import com.myapp.QLCT.repository.TransactionRepository;

@Service
public class BudgetService {
    @Autowired
    private BudgetRepository budgetRepository;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private UserAcountService userAcountService;

    @Autowired
    private TransactionRepository transactionRepository;

    public Budget createBudget(BudgetCreateRequest budget) {
        Category category = categoryService.getCategoryByName(budget.getCategoryName());
        User user = userAcountService.getUserAccountById(budget.getUserId());

        Budget newBudget = new Budget();
        newBudget.setAmount(budget.getAmount());
        newBudget.setStartDate(budget.getStartDate());
        newBudget.setEndDate(budget.getEndDate());
        newBudget.setCategory(category);
        newBudget.setNotice(budget.getNotice());
        newBudget.setUser(user);

        return budgetRepository.save(newBudget);
    }

    public boolean isOverlapping(String userId, String categoryName, LocalDate newStart, LocalDate newEnd) {
        List<Budget> budgets = budgetRepository.findByUser_IdAndCategory_Name(userId, categoryName);
        for (Budget b : budgets) {
            if (!(newEnd.isBefore(b.getStartDate()) || newStart.isAfter(b.getEndDate()))) {
                return true; // giao nhau
            }
        }
        return false;
    }

    public Budget getBudgetById(Integer budgetId) {
        return budgetRepository.findById(budgetId)
                .orElseThrow(() -> new RuntimeException("Budget not found with id: " + budgetId));
    }

    public Budget updateBudget(BudgetUpdateRequest request, Integer budgetId) {
        Category category = categoryService.getCategoryByName(request.getCategoryName());
        Budget budget = getBudgetById(budgetId);
        budget.setAmount(request.getAmount());
        budget.setStartDate(request.getStartDate());
        budget.setEndDate(request.getEndDate());
        budget.setNotice(request.getNotice());
        budget.setCategory(category);
        return budgetRepository.save(budget);
    }

    public Budget getBudgetByCategoryAndUser(String categoryName, String userId) {
        Category category = categoryService.getCategoryByName(categoryName);
        User user = userAcountService.getUserAccountById(userId);
        return budgetRepository.findByCategoryAndUser(category, user)
                .orElseThrow(() -> new RuntimeException("Budget not found for category and user"));
    }

    public Budget updateBudgetByCategory(BudgetUpdateRequest request, String userId, String categoryName) {
        Budget budget = getBudgetByCategoryAndUser(categoryName, userId);
        Category category = categoryService.getCategoryByName(request.getCategoryName());
        // UserAccount user = userAcountService.getUserAccountById(request.getUserId());
        budget.setAmount(request.getAmount());
        budget.setStartDate(request.getStartDate());
        budget.setEndDate(request.getEndDate());
        budget.setCategory(category);
        budget.setNotice(request.getNotice());
        // budget.setUser(user);
        return budgetRepository.save(budget);
    }

    // public String deleteBudget(BudgetUpdateRequest request) {
    // Budget budget = getBudgetByCategoryAndUser(request.getCategoryName(),
    // request.getUserId());
    // budgetRepository.delete(budget);
    // return "Delete success";
    // }

    public void deleteBudgetById(Integer budgetId) {
        budgetRepository.deleteById(budgetId);
    }

    public List<Budget> getAllBudgetsByUserId(String userId) {
        User user = userAcountService.getUserAccountById(userId);
        List<Budget> budgets = budgetRepository.findByUser(user);
        if (budgets.isEmpty()) {
            throw new RuntimeException("No budgets found for user");
        }
        return budgets;
    }

    public BigDecimal getBudgetAmount(String userId, String categoryName, LocalDate date) {
        return budgetRepository.findBudgetAmount(userId, categoryName, date);
    }

    // public List<BudgetResponseDTO> getBudgetsWithRemaining(String userId) {
    // List<Budget> budgets = budgetRepository.findAllByUser_UserId(userId);
    // List<BudgetResponseDTO> result = new ArrayList<>();

    // for (Budget budget : budgets) {
    // BigDecimal totalSpent = transactionRepository.getTotalChiInPeriod(
    // userId,
    // budget.getCategory().getName(),
    // budget.getStartDate().atStartOfDay(),
    // budget.getEndDate().atTime(23, 59, 59)
    // );

    // BigDecimal remaining = budget.getAmount().subtract(
    // totalSpent != null ? totalSpent : BigDecimal.ZERO
    // );

    // BudgetResponseDTO dto = new BudgetResponseDTO();
    // dto.setId(budget.getBudgetId());
    // dto.setAmount(budget.getAmount());
    // dto.setNotice(budget.getNotice());
    // dto.setStartDate(budget.getStartDate());
    // dto.setEndDate(budget.getEndDate());
    // dto.setCategoryName(budget.getCategory().getName());
    // dto.setRemainingAmount(remaining);

    // result.add(dto);
    // }

    // return result;
    // }

}
