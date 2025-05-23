package com.myapp.QLCT.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.myapp.QLCT.entity.MoneySource;
import com.myapp.QLCT.service.MoneySourceService;

@RestController
@RequestMapping("/api/moneysource")
public class MonetSourceController {
    @Autowired
    private MoneySourceService moneySourceService;

    @GetMapping("/allmoneysource")
    public List<MoneySource> getAllMoneySources() {
        return moneySourceService.getAllMoneySources();
    }

    @GetMapping("/hello")
    public String hello() {
        return "Hello, this is a test message!";
    }
    
}
