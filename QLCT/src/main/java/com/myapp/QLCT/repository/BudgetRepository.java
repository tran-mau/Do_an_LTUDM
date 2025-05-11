package com.myapp.QLCT.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.myapp.QLCT.entity.Budget;
@Repository

public interface BudgetRepository extends JpaRepository<Budget, Integer> {

    
} 
