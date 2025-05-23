package com.myapp.QLCT.dto.request;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

public class TransactionCreateRequest {
    private BigDecimal amount;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    private LocalDateTime dateTime;
    private String moneySourceName;
    private String notice;
    private Integer userId;
    private String categoryName;
    private String type;
    public TransactionCreateRequest() {
    }
    public TransactionCreateRequest(BigDecimal amount, LocalDateTime dateTime, String moneySourceName, String notice,
            Integer userId, String categoryName, String type) {
        this.amount = amount;
        this.dateTime = dateTime;
        this.moneySourceName = moneySourceName;
        this.notice = notice;
        this.userId = userId;
        this.categoryName = categoryName;
        this.type = type;
    }
    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }
    public void setMoneySourceName(String moneySourceName) {
        this.moneySourceName = moneySourceName;
    }
    public void setNotice(String notice) {
        this.notice = notice;
    }
    public void setUserId(Integer userId) {
        this.userId = userId;
    }
    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }
    public void setType(String type) {
        this.type = type;
    }
    public BigDecimal getAmount() {
        return amount;
    }
    public LocalDateTime getDateTime() {
        return dateTime;
    }
    public String getMoneySourceName() {
        return moneySourceName;
    }
    public String getNotice() {
        return notice;
    }
    public Integer getUserId() {
        return userId;
    }
    public String getCategoryName() {
        return categoryName;
    }
    public String getType() {
        return type;
    }
    
}
