package com.myapp.QLCT.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.myapp.QLCT.entity.MoneySource;

@Repository
public interface MoneySourceRepository extends JpaRepository<MoneySource, Integer> {
    Optional<MoneySource> findByNameIgnoreCase(String name);
}
