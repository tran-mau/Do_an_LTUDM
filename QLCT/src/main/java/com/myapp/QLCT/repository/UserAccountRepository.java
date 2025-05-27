package com.myapp.QLCT.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.myapp.QLCT.entity.UserAccount;


@Repository
public interface UserAccountRepository extends JpaRepository<UserAccount, String> {
    UserAccount findByUsername(String username);
    
}
