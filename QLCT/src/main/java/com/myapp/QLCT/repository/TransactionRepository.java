package com.myapp.QLCT.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.myapp.QLCT.entity.Transaction;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    // Custom query methods can be defined here if needed
    // For example, find transactions by user ID or category ID
    // List<Transaction> findByUserId(Long userId);
    // List<Transaction> findByCategoryId(Long categoryId);
    
}
