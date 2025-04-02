package com.myapp.QLCT.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.myapp.QLCT.repository.UserProfileRepository;

@Service
public class UserProfileService {
    @Autowired
    private UserProfileRepository userProfileRepository;
    
}
