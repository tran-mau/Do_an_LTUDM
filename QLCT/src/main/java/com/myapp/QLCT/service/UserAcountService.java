package com.myapp.QLCT.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.myapp.QLCT.entity.UserAccount;
import com.myapp.QLCT.repository.UserAccountRepository;

@Service
public class UserAcountService {
    @Autowired 
    private UserAccountRepository userAccountRepository;

    public UserAccount getUserAccountById(String id) {
        return userAccountRepository.findById(id).orElse(null);
    }
    
}
