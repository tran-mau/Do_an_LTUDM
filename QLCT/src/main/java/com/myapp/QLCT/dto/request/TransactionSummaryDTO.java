package com.myapp.QLCT.dto.request;

import java.math.BigDecimal;
import java.sql.Date;
import java.time.LocalDateTime;

import com.myapp.QLCT.entity.Transaction.TransactionType;

public class TransactionSummaryDTO {
    private TransactionType type;
    private String notice;
    private BigDecimal amount;
    private LocalDateTime dateTime;

    public TransactionSummaryDTO(TransactionType type, String notice, BigDecimal amount, LocalDateTime dateTime) {
        this.type = type;
        this.notice = notice;
        this.amount = amount;
        this.dateTime = dateTime;
    }

    public TransactionType getType() { return type; }
    public String getNotice() { return notice; }
    public BigDecimal getAmount() { return amount; }
    public LocalDateTime getDateTime() { return dateTime; }
}
