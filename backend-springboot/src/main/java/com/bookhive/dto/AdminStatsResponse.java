package com.bookhive.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminStatsResponse {
    private long totalOrders;
    private double totalSales;
    private long trendingBooks;
    private long totalBooks;
    private List<MonthlySalesDto> monthlySales;
}
