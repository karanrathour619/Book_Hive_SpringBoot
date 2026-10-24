package com.bookhive.controller;

import com.bookhive.dto.OrderRequest;
import com.bookhive.model.Order;
import com.bookhive.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    // create order endpoint (matches both /api/orders and /api/orders/)
    @PostMapping({"", "/"})
    public ResponseEntity<Order> createAnOrder(@RequestBody OrderRequest orderRequest) {
        Order savedOrder = orderService.createOrder(orderRequest);
        return ResponseEntity.ok(savedOrder);
    }

    // get orders by user email
    @GetMapping("/email/{email}")
    public ResponseEntity<List<Order>> getOrderByEmail(@PathVariable("email") String email) {
        List<Order> orders = orderService.getOrdersByEmail(email);
        return ResponseEntity.ok(orders);
    }
}
