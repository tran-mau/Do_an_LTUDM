package com.myapp.QLCT.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.myapp.QLCT.entity.Transaction;

import java.time.LocalDate;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    int currentMonth = LocalDate.now().getMonthValue();
    int currentYear = LocalDate.now().getYear();

    @Query("SELECT sum(amount) as total_amount FROM Transaction t WHERE type = 'thu' AND t.user.id = :id AND FUNCTION('MONTH', dateTime) = :month and FUNCTION('YEAR', dateTime) = :year")
    Long findAmountByTransactionIdAndMonthAndYear(
        @Param("id") Long id, 
        @Param("month") int month, 
        @Param("year") int year
    );

    @Query("SELECT sum(amount) as total_amount FROM Transaction t WHERE type = 'chi' AND t.user.id = :id AND FUNCTION('MONTH', dateTime) = :month and FUNCTION('YEAR', dateTime) = :year")
    Long findAmountByTransactionIdAndMonthAndYear1(
        @Param("id") Long id, 
        @Param("month") int month, 
        @Param("year") int year
    );

    @Query("SELECT SUM(CASE WHEN t.type = 'thu' THEN t.amount ELSE 0 END) - SUM(CASE WHEN t.type = 'chi' THEN t.amount ELSE 0 END) FROM Transaction t WHERE t.user.id = :id")
    Long getCurrentBalanceUser(@Param("id") Long id);  
}
