package com.myapp.QLCT.dto.request;

public class UserForBudgetRequest {
    String userId;

    public UserForBudgetRequest(String userId) {
        this.userId = userId;
    }

    public UserForBudgetRequest() {
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    
}
