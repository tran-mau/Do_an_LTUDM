package com.myapp.QLCT.dto.request;

import java.math.BigDecimal;

public class CategoryTotalDTO {
    private BigDecimal total;
    private String name;

    public CategoryTotalDTO(BigDecimal total, String name) {
        this.total = total;
        this.name = name;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public String getName() {
        return name;
    }
}
