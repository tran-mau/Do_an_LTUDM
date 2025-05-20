package com.myapp.QLCT.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transaction_id")
    private Integer transactionId;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal amount;

    @Column(name = "date_time", nullable = false)
    private LocalDateTime dateTime;

    @Column(name = "notice", length = 255)
    private String notice;

    @ManyToOne
    @JoinColumn(name = "moneysource_id")
    private MoneySource moneySource;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserAccount user;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TransactionType type;

    public enum TransactionType {
        thu, chi
    }

    public Transaction() {
    }

    public Transaction(Integer transactionId, BigDecimal amount, LocalDateTime dateTime, String notice,
            MoneySource moneySource, UserAccount user, Category category, TransactionType type) {
        this.transactionId = transactionId;
        this.amount = amount;
        this.dateTime = dateTime;
        this.notice = notice;
        this.moneySource = moneySource;
        this.user = user;
        this.category = category;
        this.type = type;
    }

    public Transaction(Integer transactionId, BigDecimal amount, LocalDateTime dateTime, String notice,
            UserAccount user, Category category, TransactionType type) {
        this.transactionId = transactionId;
        this.amount = amount;
        this.dateTime = dateTime;
        this.notice = notice;
        this.user = user;
        this.category = category;
        this.type = type;
    }

    public void setNotice(String notice) {
        this.notice = notice;
    }

    public String getNotice() {
        return notice;
    }

    public Transaction(Integer transactionId, BigDecimal amount, LocalDateTime dateTime, UserAccount user, Category category, TransactionType type) {
        this.transactionId = transactionId;
        this.amount = amount;
        this.dateTime = dateTime;
        this.user = user;
        this.category = category;
        this.type = type;
    }

    public Integer getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(Integer transactionId) {
        this.transactionId = transactionId;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    public UserAccount getUser() {
        return user;
    }

    public void setUser(UserAccount user) {
        this.user = user;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public TransactionType getType() {
        return type;
    }

    public void setType(TransactionType type) {
        this.type = type;
    }

    public MoneySource getMoneySource() {
        return moneySource;
    }

    public void setMoneySource(MoneySource moneySource) {
        this.moneySource = moneySource;
    }
}
