package com.myapp.QLCT.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.myapp.QLCT.dto.request.BudgetCreateRequest;
import com.myapp.QLCT.dto.request.BudgetUpdateRequest;
import com.myapp.QLCT.entity.Budget;
import com.myapp.QLCT.entity.Category;
import com.myapp.QLCT.repository.BudgetRepository;

@Service
public class BudgetService {
    @Autowired
    private BudgetRepository budgetRepository;

    @Autowired
    private CategoryService categoryService;

    // public Budget createBudget(BudgetCreateRequest budget) {
    //     Category category = categoryService.getCategoryByName(budget.getCategoryName());
    //     // UserAccount userAccount =
    //     // userAcountService.getUserAccountById(budget.getUserId());
    //     UserAccount userAccount = userAcountService.getUserAccountById(1);

    //     Budget newBudget = new Budget();
    //     newBudget.setAmount(budget.getAmount());
    //     newBudget.setStartDate(budget.getStartDate());
    //     newBudget.setEndDate(budget.getEndDate());
    //     newBudget.setCategory(category);
    //     newBudget.setNotice(budget.getNotice());
    //     newBudget.setUser(userAccount);

    //     return budgetRepository.save(newBudget);
    // }

    // public Budget getBudgetByCategoryAndUser(String categoryName, Integer userId) {
    //     Category category = categoryService.getCategoryByName(categoryName);
    //     UserAccount user = userAcountService.getUserAccountById(userId);
    //     return budgetRepository.findByCategoryAndUser(category, user)
    //             .orElseThrow(() -> new RuntimeException("Budget not found for category and user"));
    // }

    // public Budget updateBudget(BudgetUpdateRequest request) {
    //     Budget budget = getBudgetByCategoryAndUser(request.getCategoryName(), request.getUserId());
    //     Category category = categoryService.getCategoryByName(request.getCategoryName());
    //     // UserAccount user = userAcountService.getUserAccountById(request.getUserId());
    //     budget.setAmount(request.getAmount());
    //     budget.setStartDate(request.getStartDate());
    //     budget.setEndDate(request.getEndDate());
    //     budget.setCategory(category);
    //     budget.setNotice(request.getNotice());
    //     // budget.setUser(user);
    //     return budgetRepository.save(budget);
    // }

    // public String deleteBudget(BudgetUpdateRequest request) {
    //     Budget budget = getBudgetByCategoryAndUser(request.getCategoryName(), request.getUserId());
    //     budgetRepository.delete(budget);
    //     return "Delete success";
    // }

    // public List<Budget> getAllBudgetsByUserId(Integer userId) {
    //     UserAccount user = userAcountService.getUserAccountById(userId);
    //     List<Budget> budgets = budgetRepository.findByUser(user);
    //     if (budgets.isEmpty()) {
    //         throw new RuntimeException("No budgets found for user");
    //     }
    //     return budgets;
    // }
}
