package com.myapp.QLCT.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.myapp.QLCT.dto.request.BudgetCreateRequest;
import com.myapp.QLCT.entity.Budget;
import com.myapp.QLCT.entity.Category;
import com.myapp.QLCT.entity.UserAccount;
import com.myapp.QLCT.repository.BudgetRepository;

@Service
public class BudgetService {
    @Autowired
    private BudgetRepository budgetRepository;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private UserAcountService userAcountService;

    public Budget createBudget(BudgetCreateRequest budget) {
        Category category = categoryService.getCategoryByName(budget.getCategoryName());
        // UserAccount userAccount = userAcountService.getUserAccountById(budget.getUserId());
        UserAccount userAccount = userAcountService.getUserAccountById(1);

        Budget newBudget = new Budget();
        newBudget.setAmount(budget.getAmount());
        newBudget.setStartDate(budget.getStartDate());
        newBudget.setEndDate(budget.getEndDate());
        newBudget.setCategory(category);
        newBudget.setNotice(budget.getNotice());
        newBudget.setUser(userAccount);

        return budgetRepository.save(newBudget);
    }
}
