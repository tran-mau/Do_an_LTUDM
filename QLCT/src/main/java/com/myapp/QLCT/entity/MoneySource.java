package com.myapp.QLCT.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "moneysource")
public class MoneySource {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "moneysource_id")
    private Integer moneySourceId;

    @Column(nullable = false, unique = true, length = 100,name = "name")
    private String name;

    public MoneySource() {
    }

    public MoneySource(Integer moneySourceId, String name) {
        this.moneySourceId = moneySourceId;
        this.name = name;
    }

    public Integer getMoneySourceId() {
        return moneySourceId;
    }

    public String getName() {
        return name;
    }

    public void setMoneySourceId(Integer moneySourceId) {
        this.moneySourceId = moneySourceId;
    }

    public void setName(String name) {
        this.name = name;
    }

    
}
