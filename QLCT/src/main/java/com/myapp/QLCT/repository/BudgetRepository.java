package com.myapp.QLCT.repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.myapp.QLCT.entity.Budget;
import com.myapp.QLCT.entity.Category;
import com.myapp.QLCT.entity.User;

@Repository

public interface BudgetRepository extends JpaRepository<Budget, Integer> {
    Optional<Budget> findByCategory(Category category);

    Optional<Budget> findByCategoryAndUser(Category category, User user);

    List<Budget> findByUser(User user);

    // List<Budget> findAllByUser_UserId(String userId);
    @Query("SELECT b.amount FROM Budget b WHERE b.user.id = :userId AND b.category.name = :categoryName AND :date BETWEEN b.startDate AND b.endDate")
    BigDecimal findBudgetAmount(@Param("userId") String userId,
            @Param("categoryName") String categoryName,
            @Param("date") LocalDate date);

}
