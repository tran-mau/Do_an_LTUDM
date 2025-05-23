package com.myapp.QLCT.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.myapp.QLCT.entity.Budget;
import com.myapp.QLCT.entity.Category;
import com.myapp.QLCT.entity.UserAccount;
@Repository

public interface BudgetRepository extends JpaRepository<Budget, Integer> {
    Optional<Budget> findByCategory(Category category);
    Optional<Budget> findByCategoryAndUser(Category category, UserAccount user);
    List <Budget> findByUser(UserAccount user);
} 
