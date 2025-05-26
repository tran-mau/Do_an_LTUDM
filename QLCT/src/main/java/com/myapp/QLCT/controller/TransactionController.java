package com.myapp.QLCT.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.myapp.QLCT.service.TransactionService;
import com.myapp.QLCT.dto.request.CategoryTotalDTO;
import com.myapp.QLCT.dto.request.TransactionCreateRequest;
import com.myapp.QLCT.entity.Transaction;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {
    @Autowired
    private TransactionService transactionService;

    // @Autowired
    // private CategoryTotalDTO categoryTotalDTO;

    @GetMapping("/user/amount-in")
    public Long getAmountInByUserIdAndMonthAndYear(
            @RequestParam("userId") Long userId) {
        return transactionService.getCurrentMonthIncome(userId);
    }
    @GetMapping("/user/amount-out")
    public Long getAmountOutByUserIdAndMonthAndYear(
            @RequestParam("userId") Long userId) {
        return transactionService.getCurrentMonthOutcome(userId);
    }
    @GetMapping("/user/balance")
    public Long getCurrentBalanceUser(
            @RequestParam("userId") Long userId) {
        return transactionService.getCurrentBalanceUser(userId);
    }
    @GetMapping("/user/get-list-amount-in")
    public List<CategoryTotalDTO> getListAmountin(@RequestParam Long userId) {
        return transactionService.getMonthlyIncomeByCategory(userId);
    }

    @GetMapping("/user/get-list-amount-out")
    public List<CategoryTotalDTO> getListAmountout(@RequestParam Long userId) {
        return transactionService.getMonthlyOutcomeByCategory(userId);
    }

    // @PostMapping("/create")
    // public Transaction createTransaction(@RequestBody TransactionCreateRequest transaction) {
    //     return transactionService.createTransaction(transaction);
    // }
}
