package com.myapp.QLCT.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.myapp.QLCT.entity.User;


@Repository
public interface UserAccountRepository extends JpaRepository<User, String> {
    User findByUsername(String username);
    
}
