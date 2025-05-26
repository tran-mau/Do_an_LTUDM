package com.myapp.QLCT.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.myapp.QLCT.service.TransactionService;
import com.myapp.QLCT.dto.request.CategoryTotalDTO;
import com.myapp.QLCT.dto.request.RevenueSummaryDTO;
import com.myapp.QLCT.dto.request.TransactionCreateRequest;
import com.myapp.QLCT.dto.request.TransactionSummaryDTO;
import com.myapp.QLCT.dto.request.transactionDTO;
import com.myapp.QLCT.entity.Transaction;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "http://localhost:4200")
public class TransactionController {
    @Autowired
    private TransactionService transactionService;

    @GetMapping("")
    public List<transactionDTO> showTransactionEntity() {
        return transactionService.showTransactionDTO();
    }

    @DeleteMapping("/remove")
    public void removeTransactionEntity(@RequestParam int id) {
        transactionService.removeTransactionEntity(id);
    }

    @PutMapping("/update") 
    public ResponseEntity<transactionDTO> updateTransaction(
            @RequestParam int id,
            @RequestBody transactionDTO updatedDTO) {
        
        System.out.println("=== UPDATE REQUEST RECEIVED ===");
        System.out.println("Transaction ID: " + id);
        System.out.println("Updated data: " + updatedDTO);
        
        try {
            transactionDTO result = transactionService.updateTransaction(id, updatedDTO);
            return ResponseEntity.ok(result);
        } catch (RuntimeException e) {
            System.out.println("Error: " + e.getMessage());
            return ResponseEntity.notFound().build(); 
        }
    }

    // @Autowired
    // private CategoryTotalDTO categoryTotalDTO;

    @GetMapping("/user/amount-in")
    public Long getAmountInByUserIdAndMonthAndYear(
            @RequestParam("userId") String userId,
            @RequestParam("month") int month,
            @RequestParam("year") int year) {
        return transactionService.getCurrentMonthIncome(userId, month, year);
    }
    @GetMapping("/user/amount-out")
    public Long getAmountOutByUserIdAndMonthAndYear(
            @RequestParam("userId") String userId,
            @RequestParam("month") int month,
            @RequestParam("year") int year) {
        return transactionService.getCurrentMonthOutcome(userId, month, year);
    }
    @GetMapping("/user/balance")
    public Long getCurrentBalanceUser(
            @RequestParam("userId") String userId) {
        return transactionService.getCurrentBalanceUser(userId);
    }
    @GetMapping("/user/get-list-amount-in")
    public List<CategoryTotalDTO> getListAmountin(@RequestParam String userId) {
        return transactionService.getMonthlyIncomeByCategory(userId);
    }

    @GetMapping("/user/get-list-amount-out")
    public List<CategoryTotalDTO> getListAmountout(@RequestParam String userId) {
        return transactionService.getMonthlyOutcomeByCategory(userId);
    }

    // @GetMapping("/user/get-revenue-summary")
    // public List<RevenueSummaryDTO> getRevenueSummary(@RequestParam("userId") String userId) {
    //     return transactionService.getMonthlyRevenueSummary(userId);
    // }

    @GetMapping("/user/get-trasaction-by-user-and-year")
    public List<Transaction> getTransactionByUserAndYear(
            @RequestParam("userId") String userId,
            @RequestParam("year") int year) {
        return transactionService.getTransactionByUserIdAndYear(userId, year);
    }

    @GetMapping("/user/get-top4-transaction-by-user")
    public  List<TransactionSummaryDTO> getTop4ByUserId(@RequestParam("userId") String userId) {
        return transactionService.getTop4Transactions(userId);
    }

    // @PostMapping("/create")
    // public Transaction createTransaction(@RequestBody TransactionCreateRequest transaction) {
    //     return transactionService.createTransaction(transaction);
    // }
}
