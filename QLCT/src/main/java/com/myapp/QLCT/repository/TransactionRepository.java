package com.myapp.QLCT.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.myapp.QLCT.dto.request.CategoryTotalDTO;
import com.myapp.QLCT.entity.Transaction;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Integer> {

    @Query("SELECT COALESCE(SUM(t.amount), 0) FROM Transaction t " +
           "WHERE t.type = 'thu' " +
           "AND t.user.id = :userId " +
           "AND FUNCTION('MONTH', t.dateTime) = :month " +
           "AND FUNCTION('YEAR', t.dateTime) = :year")
    Long calculateTotalIncomeByUserAndMonth(
            @Param("userId") Long userId,
            @Param("month") int month,
            @Param("year") int year);

    @Query("SELECT COALESCE(SUM(t.amount), 0) FROM Transaction t " +
           "WHERE t.type = 'chi' " +
           "AND t.user.id = :userId " +
           "AND FUNCTION('MONTH', t.dateTime) = :month " +
           "AND FUNCTION('YEAR', t.dateTime) = :year")
    Long calculateTotalExpenseByUserAndMonth(
            @Param("userId") Long userId,
            @Param("month") int month,
            @Param("year") int year);

    @Query("SELECT COALESCE(SUM(CASE WHEN t.type = 'thu' THEN t.amount ELSE 0 END), 0) - " +
           "COALESCE(SUM(CASE WHEN t.type = 'chi' THEN t.amount ELSE 0 END), 0) " +
           "FROM Transaction t " +
           "WHERE t.user.id = :userId")
    Long calculateCurrentBalanceByUser(@Param("userId") Long userId);

    @Query("SELECT new com.myapp.QLCT.dto.request.CategoryTotalDTO(COALESCE(SUM(t.amount), 0), t.category.name) " +
           "FROM Transaction t " +
           "WHERE FUNCTION('MONTH', t.dateTime) = :month " +
           "AND FUNCTION('YEAR', t.dateTime) = :year " +
           "AND t.type = :transactionType " +
           "AND t.user.id = :userId " +
           "GROUP BY t.category.name")
    List<CategoryTotalDTO> findCategoryTotalsByTypeAndPeriod(
            @Param("userId") Long userId,
            @Param("month") int month,
            @Param("year") int year,
            @Param("transactionType") Transaction.TransactionType transactionType);
}