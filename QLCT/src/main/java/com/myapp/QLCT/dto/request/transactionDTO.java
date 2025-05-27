package com.myapp.QLCT.dto.request;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.myapp.QLCT.entity.Transaction;
import com.myapp.QLCT.entity.Transaction.TransactionType;
import com.myapp.QLCT.entity.User;

public class transactionDTO {
    private int transaction_id;
    private BigDecimal amount;
    private TransactionType transaction_type;
    private LocalDateTime transaction_date;
    private String note;
    private String category_name;
    private String user_id;

    // Default constructor
    public transactionDTO() {}

    // Constructor from entity
    public transactionDTO(Transaction entity) {
        this.transaction_id = entity.getTransactionId();
        this.amount = entity.getAmount();
        this.transaction_type = entity.getType();
        this.transaction_date = entity.getDateTime();
        this.note = entity.getNotice();
        if (entity.getUser() != null) {
            this.user_id = entity.getUser().getId();
        }
        if (entity.getCategory() != null) {
            this.category_name = entity.getCategory().getName();
        }
    }

    // Getters and Setters
    public int getTransaction_id() {
        return transaction_id;
    }

    public void setTransaction_id(int transaction_id) {
        this.transaction_id = transaction_id;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public TransactionType getTransaction_type() {
        return transaction_type;
    }

    public void setTransaction_type(TransactionType transaction_type) {
        this.transaction_type = transaction_type;
    }

    public LocalDateTime getTransaction_date() {
        return transaction_date;
    }

    public void setTransaction_date(LocalDateTime transaction_date) {
        this.transaction_date = transaction_date;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getCategory_name() {
        return category_name;
    }

    public void setCategory_name(String category_name) {
        this.category_name = category_name;
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }
}