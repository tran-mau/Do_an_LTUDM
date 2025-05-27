package com.myapp.QLCT.repository;

import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.myapp.QLCT.dto.projection.TransactionSummaryProjection;
import com.myapp.QLCT.dto.request.CategoryTotalDTO;
import com.myapp.QLCT.dto.request.RevenueSummaryDTO;
import com.myapp.QLCT.dto.request.TransactionSummaryDTO;
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
                     @Param("userId") String userId,
                     @Param("month") int month,
                     @Param("year") int year);

       @Query("SELECT COALESCE(SUM(t.amount), 0) FROM Transaction t " +
                     "WHERE t.type = 'chi' " +
                     "AND t.user.id = :userId " +
                     "AND FUNCTION('MONTH', t.dateTime) = :month " +
                     "AND FUNCTION('YEAR', t.dateTime) = :year")
       Long calculateTotalExpenseByUserAndMonth(
                     @Param("userId") String userId,
                     @Param("month") int month,
                     @Param("year") int year);

       @Query("SELECT COALESCE(SUM(CASE WHEN t.type = 'thu' THEN t.amount ELSE 0 END), 0) - " +
                     "COALESCE(SUM(CASE WHEN t.type = 'chi' THEN t.amount ELSE 0 END), 0) " +
                     "FROM Transaction t " +
                     "WHERE t.user.id = :userId")
       Long calculateCurrentBalanceByUser(@Param("userId") String userId);

       @Query("SELECT new com.myapp.QLCT.dto.request.CategoryTotalDTO(COALESCE(SUM(t.amount), 0), t.category.name) " +
                     "FROM Transaction t " +
                     "WHERE FUNCTION('MONTH', t.dateTime) = :month " +
                     "AND FUNCTION('YEAR', t.dateTime) = :year " +
                     "AND t.type = :transactionType " +
                     "AND t.user.id = :userId " +
                     "GROUP BY t.category.name")
       List<CategoryTotalDTO> findCategoryTotalsByTypeAndPeriod(
                     @Param("userId") String userId,
                     @Param("month") int month,
                     @Param("year") int year,
                     @Param("transactionType") Transaction.TransactionType transactionType);

       // @Query("SELECT new com.myapp.QLCT.dto.request.RevenueSummaryDTO( " +
       // "COALESCE(SUM(CASE WHEN t.type = 'thu' THEN t.amount ELSE 0 END), 0), " +
       // "COALESCE(SUM(CASE WHEN t.type = 'chi' THEN t.amount ELSE 0 END), 0)) " +
       // "FROM Transaction t " +
       // "WHERE t.user.id = :userId " +
       // "AND FUNCTION('YEAR', t.dateTime) = :year " +
       // "GROUP BY FUNCTION('MONTH', t.dateTime) " +
       // "ORDER BY FUNCTION('MONTH', t.dateTime)")
       // List<RevenueSummaryDTO> getMonthlyRevenueSummary(@Param("userId") String
       // userId, @Param("year") int year);

       @Query("SELECT t FROM Transaction t WHERE t.user.id = :userId AND FUNCTION('YEAR', t.dateTime) = :year")
       List<Transaction> findTransactionsByUserAndYear(@Param("userId") String userId, @Param("year") int year);

       // @Query("SELECT new com.myapp.QLCT.dto.request.TransactionSummaryDTO(t.type,
       // t.notice, t.amount) " +
       // "FROM Transaction t WHERE t.user.id = :userId ORDER BY t.dateTime ASC")
       // List<TransactionSummaryDTO> findTop4TransactionsByUserId(@Param("userId")
       // String userId, PageRequest pageable);
       @Query("SELECT new com.myapp.QLCT.dto.request.TransactionSummaryDTO(t.type, t.notice, t.amount, t.dateTime) " +
                     "FROM Transaction t WHERE t.user.id = :userId ORDER BY t.dateTime DESC LIMIT 4")
       List<TransactionSummaryDTO> findTop4ByUserId(@Param("userId") String userId);

       @Query("SELECT t FROM Transaction t WHERE t.user.id = :userId ORDER BY t.dateTime DESC") 
List<Transaction> findByUserId(@Param("userId") String userId);


}