package com.myapp.QLCT.dto.request;

import java.time.LocalDate;

public class TotalChiRequest {
    private String userId;
    private String categoryName;
    private LocalDate startDate;
    private LocalDate endDate;
    public TotalChiRequest() {
    }
    public TotalChiRequest(String userId, String categoryName, LocalDate startDate, LocalDate endDate) {
        this.userId = userId;
        this.categoryName = categoryName;
        this.startDate = startDate;
        this.endDate = endDate;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }
    public void setcategoryName(String categoryName) {
        this.categoryName = categoryName;
    }
    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }
    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }
    public String getUserId() {
        return userId;
    }
    public String getcategoryName() {
        return categoryName;
    }
    public LocalDate getStartDate() {
        return startDate;
    }
    public LocalDate getEndDate() {
        return endDate;
    }

    
}
