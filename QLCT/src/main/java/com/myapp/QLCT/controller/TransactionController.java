package com.myapp.QLCT.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.myapp.QLCT.service.TransactionService;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {
    @Autowired
    private TransactionService transactionService;

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
}
