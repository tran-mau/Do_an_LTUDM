package com.myapp.QLCT.dto.projection;

import java.math.BigDecimal;

public interface TransactionSummaryProjection {
    String getType();
    String getNotice();
    BigDecimal getAmount();
}
