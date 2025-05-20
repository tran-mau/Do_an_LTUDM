package com.myapp.QLCT.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.myapp.QLCT.entity.MoneySource;
import com.myapp.QLCT.repository.MoneySourceRepository;

@Service
public class MoneySourceService {
    @Autowired
    private MoneySourceRepository moneySourceRepository;

    public List<MoneySource> getAllMoneySources() {
        return moneySourceRepository.findAll();
    }
    public MoneySource getMoneySourceByName(String name) {
        return moneySourceRepository.findByNameIgnoreCase(name)
            .orElse(null);
    }
}
