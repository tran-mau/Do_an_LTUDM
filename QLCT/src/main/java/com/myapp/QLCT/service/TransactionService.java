package com.myapp.QLCT.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.myapp.QLCT.dto.projection.TransactionSummaryProjection;
import com.myapp.QLCT.dto.request.CategoryTotalDTO;
import com.myapp.QLCT.dto.request.RevenueSummaryDTO;
import com.myapp.QLCT.dto.request.TransactionCreateRequest;
import com.myapp.QLCT.dto.request.TransactionSummaryDTO;
import com.myapp.QLCT.entity.Category;
import com.myapp.QLCT.entity.MoneySource;
import com.myapp.QLCT.entity.Transaction;
import com.myapp.QLCT.entity.Transaction.TransactionType;
import com.myapp.QLCT.entity.UserAccount;
import com.myapp.QLCT.repository.TransactionRepository;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private UserAcountService userAcountService;

    @Autowired
    private MoneySourceService moneySourceService;

    public Long getCurrentMonthIncome(String userId, int month, int year) {
        return transactionRepository.calculateTotalIncomeByUserAndMonth(userId, month, year);
    }

    public Long getCurrentMonthOutcome(String userId, int month, int year) {
        return transactionRepository.calculateTotalExpenseByUserAndMonth(userId, month, year);
    }

    public Long getCurrentBalanceUser(String userId) {
        return transactionRepository.calculateCurrentBalanceByUser(userId);
    }

    public List<CategoryTotalDTO> getMonthlyIncomeByCategory(String userId) {
        LocalDate now = LocalDate.now();
        int month = now.getMonthValue();
        int year = now.getYear();
        return transactionRepository.findCategoryTotalsByTypeAndPeriod(userId, month, year, TransactionType.thu);
    }

    public List<CategoryTotalDTO> getMonthlyOutcomeByCategory(String userId) {
        LocalDate now = LocalDate.now();
        int month = now.getMonthValue();
        int year = now.getYear();
        return transactionRepository.findCategoryTotalsByTypeAndPeriod(userId, month, year, TransactionType.chi);
    }

    public List<Transaction> getTransactionByUserIdAndYear(String userId, int year) {
        return transactionRepository.findTransactionsByUserAndYear(userId, year);
    }

    public List<TransactionSummaryDTO> getTop4Transactions(String userId) {
        return transactionRepository.findTop4ByUserId(userId);
    }

    // public Transaction createTransaction(TransactionCreateRequest request){
    // Category category =
    // categoryService.getCategoryByName(request.getCategoryName());
    // // UserAccount userAccount =
    // userAcountService.getUserAccountById(budget.getUserId());
    // UserAccount userAccount = userAcountService.getUserAccountById(1);

    // MoneySource moneySource =
    // moneySourceService.getMoneySourceByName(request.getMoneySourceName());
    // Transaction transaction = new Transaction();
    // transaction.setAmount(request.getAmount());
    // transaction.setDateTime(request.getDateTime());
    // transaction.setNotice(request.getNotice());
    // transaction.setUser(userAccount);
    // transaction.setCategory(category);
    // transaction.setType(TransactionType.valueOf(request.getType()));
    // transaction.setMoneySource(moneySource);
    // return transactionRepository.save(transaction);

    // }
}