package com.bookhive.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MonthlySalesDto {
    @JsonProperty("_id")
    private String monthId;
    private double totalSales;
    private long totalOrders;
}
