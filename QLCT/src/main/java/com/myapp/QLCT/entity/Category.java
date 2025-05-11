package com.myapp.QLCT.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private Integer categoryId;

    @Column(nullable = false, unique = true, length = 100)
    private String name;

    // Constructor mặc định
    public Category() {
    }

    // Constructor đầy đủ
    public Category(Integer categoryId, String name) {
        this.categoryId = categoryId;
        this.name = name;
    }

    // Getter và Setter
    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
