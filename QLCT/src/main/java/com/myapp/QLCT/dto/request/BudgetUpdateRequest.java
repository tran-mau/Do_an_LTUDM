package com.myapp.QLCT.dto.request;

import java.math.BigDecimal;
import java.time.LocalDate;

public class BudgetUpdateRequest {
    private BigDecimal amount;
    private LocalDate startDate;
    private LocalDate endDate;
    private String categoryName;
    private String notice;
    private Integer userId;
    public BudgetUpdateRequest() {
    }
    public BudgetUpdateRequest(BigDecimal amount, LocalDate startDate, LocalDate endDate, String categoryName,
            String notice, Integer userId) {
        this.amount = amount;
        this.startDate = startDate;
        this.endDate = endDate;
        this.categoryName = categoryName;
        this.notice = notice;
        this.userId = userId;
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
    public String getCategoryName() {
        return categoryName;
    }
    public String getNotice() {
        return notice;
    }
    public Integer getUserId() {
        return userId;
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
    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }
    public void setNotice(String notice) {
        this.notice = notice;
    }
    public void setUserId(Integer userId) {
        this.userId = userId;
    } 
}
