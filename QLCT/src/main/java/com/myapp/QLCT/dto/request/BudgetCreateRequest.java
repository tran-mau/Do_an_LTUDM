package com.myapp.QLCT.dto.request;

import java.math.BigDecimal;
import java.time.LocalDate;

import org.springframework.boot.autoconfigure.security.SecurityProperties.User;

import jakarta.persistence.criteria.CriteriaBuilder.In;


public class BudgetCreateRequest {
    private BigDecimal amount;
    private LocalDate startDate;
    private LocalDate endDate;
    private String categoryName;
    private String notice;
    private String userId; // dung de test them budget banwgf cacsh truyen id truc tiep ,test xong xoa
    public BudgetCreateRequest() {
    }
    public BudgetCreateRequest( BigDecimal amount, LocalDate startDate, LocalDate endDate,
            String categoryName, String notice ,String userId) {
        this.amount = amount;
        this.startDate = startDate;
        this.endDate = endDate;
        this.categoryName = categoryName;
        this.notice = notice;
        this.userId = userId;
    }
    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }
    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }
    public void setNotice(String notice) {
        this.notice = notice;
    }
    public BigDecimal getAmount() {
        return amount;
    }
    public LocalDate getStartDate() {
        return startDate;
    }
    public LocalDate getEndDate() {
        return endDate;
    }
    public String getNotice() {
        return notice;
    }
    public String getCategoryName() {
        return categoryName;
    }
    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }
    public String getUserId() {
        return userId;
    }
    
    
}
