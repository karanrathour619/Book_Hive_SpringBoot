package com.bookhive.repository;

import com.bookhive.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByEmailOrderByCreatedAtDesc(String email);

    @Query("SELECT COALESCE(SUM(o.totalPrice), 0) FROM Order o")
    Double sumTotalSales();

    @Query(value = """
            SELECT TO_CHAR(o.created_at, 'YYYY-MM') AS month_id,
                   SUM(o.total_price)               AS total_sales,
                   COUNT(*)                         AS total_orders
            FROM orders o
            GROUP BY month_id
            ORDER BY month_id ASC
            """, nativeQuery = true)
    List<Object[]> getMonthlySales();
}
