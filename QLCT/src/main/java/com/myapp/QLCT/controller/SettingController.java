package com.myapp.QLCT.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.myapp.QLCT.entity.UserAccount;
import com.myapp.QLCT.service.SettingService;

@RestController
@RequestMapping("/api/settings")
public class SettingController {

    SettingService settingService;

    // @GetMapping("/user")
    // public ResponseEntity<UserAccount> getCurrentUserInfo() {
    //     UserAccount userAccount = settingService.getUserAccount();
    //     return ResponseEntity.ok(userAccount);
    // }
}