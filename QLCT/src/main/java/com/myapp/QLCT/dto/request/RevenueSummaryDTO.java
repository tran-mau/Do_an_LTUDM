package com.myapp.QLCT.dto.request;

// import java.math.Long;

public class RevenueSummaryDTO {
    private Long income;
    private Long expense;

    public RevenueSummaryDTO(Long income, Long expense) {
        this.income = income;
        this.expense = expense;
    }

    public Long getIncome() {
        return income;
    }

    public void setIncome(Long income) {
        this.income = income;
    }

    public Long getExpense() {
        return expense;
    }

    public void setExpense(Long expense) {
        this.expense = expense;
    }
}
