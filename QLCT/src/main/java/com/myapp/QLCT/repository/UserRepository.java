package com.myapp.QLCT.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.myapp.QLCT.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    
}
