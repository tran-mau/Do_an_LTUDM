package com.myapp.QLCT.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.myapp.QLCT.entity.UserAccount;
import com.myapp.QLCT.repository.UserAccountRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/user-accounts")
public class UserAccountController {

    @Autowired
    private UserAccountRepository userAccountRepository;

    @GetMapping("/hello")
    public String getMethodName(@RequestParam(value = "param", defaultValue = "DefaultValue") String param) {
        return "Hello, " + param;
    }

    @GetMapping("/user/{id}")
    public UserAccount getUser(@PathVariable Integer id) {
        return userAccountRepository.findById(id).orElse(null); // Trả về null nếu không tìm thấy người dùng
    }
}
