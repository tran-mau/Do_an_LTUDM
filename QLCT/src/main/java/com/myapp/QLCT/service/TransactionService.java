package com.myapp.QLCT.service;
import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.myapp.QLCT.repository.TransactionRepository;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    public Long getCurrentMonthIncome(Long userId) {
        LocalDate now = LocalDate.now();
        int month = now.getMonthValue();
        int year = now.getYear();

        return transactionRepository.findAmountByTransactionIdAndMonthAndYear(userId, month, year);
    }

    public Long getCurrentMonthOutcome(Long userId) {
        LocalDate now = LocalDate.now();
        int month = now.getMonthValue();
        int year = now.getYear();

        return transactionRepository.findAmountByTransactionIdAndMonthAndYear1(userId, month, year);
    }
    
    public Long getCurrentBalanceUser(Long userId) {
        return transactionRepository.getCurrentBalanceUser(userId);
    }
}