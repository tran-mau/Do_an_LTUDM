package com.myapp.QLCT.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.myapp.QLCT.service.UserProfileService;

@RestController
public class UserProfileController {
    @Autowired
    private UserProfileService userProfileService;
    
}
