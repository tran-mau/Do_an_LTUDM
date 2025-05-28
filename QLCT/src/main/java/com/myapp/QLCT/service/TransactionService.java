package com.myapp.QLCT.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.myapp.QLCT.dto.projection.TransactionSummaryProjection;
import com.myapp.QLCT.dto.request.CategoryTotalDTO;
import com.myapp.QLCT.dto.request.RevenueSummaryDTO;
import com.myapp.QLCT.dto.request.TransactionCreateRequest;
import com.myapp.QLCT.dto.request.TransactionSummaryDTO;
import com.myapp.QLCT.dto.request.transactionDTO;
import com.myapp.QLCT.entity.Category;
import com.myapp.QLCT.entity.User;
import com.myapp.QLCT.entity.MoneySource;
import com.myapp.QLCT.entity.Transaction;
import com.myapp.QLCT.entity.Transaction.TransactionType;
import com.myapp.QLCT.repository.CategoryRepository;
import com.myapp.QLCT.repository.TransactionRepository;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private CategoryRepository categoryRepository;

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

    public List<transactionDTO> getAllTransactionDTO(String userId) {
        List<Transaction> transactionEntities = transactionRepository.findByUserId(userId);
        return transactionEntities.stream()
                .map(transactionDTO::new)
                .toList();
    }

    public List<transactionDTO> showTransactionDTO(String userId, int value, ChronoUnit unit) {
        LocalDateTime fromTime = LocalDateTime.now().minus(value, unit);
        List<Transaction> transactionEntities = transactionRepository.findByUserIdAndDatetimeAfter(userId, fromTime);
        return transactionEntities.stream()
                .map(transactionDTO::new)
                .toList();
    }

    public void removeTransactionEntity(int id) {
        transactionRepository.deleteById(id);
    }

    public transactionDTO updateTransaction(int id, transactionDTO updatedDTO) {
        System.out.println("=== SERVICE UPDATE ===");
        System.out.println("Looking for transaction with ID: " + id);

        Optional<Transaction> optionalTransaction = transactionRepository.findById(id);

        if (optionalTransaction.isPresent()) {
            System.out.println("Transaction found, updating...");
            Transaction entity = optionalTransaction.get();

            // Update entity fields from DTO
            entity.setAmount(updatedDTO.getAmount());
            entity.setType(updatedDTO.getTransaction_type());

            if (updatedDTO.getTransaction_date() != null) {
                entity.setDateTime(updatedDTO.getTransaction_date());
            }

            entity.setNotice(updatedDTO.getNote());

            // Only update category if category_name is provided
            if (updatedDTO.getCategory_name() != null && !updatedDTO.getCategory_name().isEmpty()) {
                Optional<Category> optionalCategory = categoryRepository.findByName(updatedDTO.getCategory_name());
                if (optionalCategory.isPresent()) {
                    entity.setCategory(optionalCategory.get());
                } else {
                    throw new RuntimeException("Category not found with name " + updatedDTO.getCategory_name());
                }
            }

            // Save updated entity
            Transaction savedEntity = transactionRepository.save(entity);
            System.out.println("Transaction updated successfully");

            // Return updated DTO
            return new transactionDTO(savedEntity);
        } else {
            System.out.println("Transaction not found with ID: " + id);
            throw new RuntimeException("Transaction not found with id " + id);
        }
    }

    public Transaction createTransaction(TransactionCreateRequest request) {
        Category category = categoryService.getCategoryByName(request.getCategoryName());
        User user = userAcountService.getUserAccountById(request.getUserId());

        MoneySource moneySource = moneySourceService.getMoneySourceByName(request.getMoneySourceName());
        Transaction transaction = new Transaction();
        transaction.setAmount(request.getAmount());
        transaction.setDateTime(request.getDateTime());
        transaction.setNotice(request.getNotice());
        transaction.setUser(user);
        transaction.setCategory(category);
        transaction.setType(TransactionType.valueOf(request.getType()));
        transaction.setMoneySource(moneySource);
        return transactionRepository.save(transaction);

    }

    public BigDecimal getTotalChi(String userId, String categoryName, LocalDateTime startDate, LocalDateTime endDate) {
        return transactionRepository.getTotalChiInPeriod(userId, categoryName, startDate, endDate);
    }

}