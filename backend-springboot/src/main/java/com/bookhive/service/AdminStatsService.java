package com.bookhive.service;

import com.bookhive.dto.AdminStatsResponse;
import com.bookhive.dto.MonthlySalesDto;
import com.bookhive.repository.BookRepository;
import com.bookhive.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminStatsService {

    private final OrderRepository orderRepository;
    private final BookRepository bookRepository;

    public AdminStatsResponse getStats() {
        long totalOrders = orderRepository.count();
        Double totalSalesRaw = orderRepository.sumTotalSales();
        double totalSales = totalSalesRaw != null ? totalSalesRaw : 0.0;
        long trendingBooks = bookRepository.countByTrendingTrue();
        long totalBooks = bookRepository.count();

        List<Object[]> rawMonthlySales = orderRepository.getMonthlySales();
        List<MonthlySalesDto> monthlySales = new ArrayList<>();
        for (Object[] row : rawMonthlySales) {
            String monthId = (String) row[0];
            double sales = ((Number) row[1]).doubleValue();
            long orders = ((Number) row[2]).longValue();
            monthlySales.add(MonthlySalesDto.builder()
                    .monthId(monthId)
                    .totalSales(sales)
                    .totalOrders(orders)
                    .build());
        }

        return AdminStatsResponse.builder()
                .totalOrders(totalOrders)
                .totalSales(totalSales)
                .trendingBooks(trendingBooks)
                .totalBooks(totalBooks)
                .monthlySales(monthlySales)
                .build();
    }
}
