package com.bookhive.service;

import com.bookhive.dto.OrderRequest;
import com.bookhive.model.Order;
import com.bookhive.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;

    public Order createOrder(OrderRequest req) {
        OrderRequest.Address addr = req.getAddress();
        Order order = Order.builder()
                .name(req.getName())
                .email(req.getEmail())
                .phone(req.getPhone())
                .totalPrice(req.getTotalPrice())
                .productIds(req.getProductIds())
                .city(addr != null ? addr.getCity() : null)
                .country(addr != null ? addr.getCountry() : null)
                .state(addr != null ? addr.getState() : null)
                .zipcode(addr != null ? addr.getZipcode() : null)
                .build();
        return orderRepository.save(order);
    }

    public List<Order> getOrdersByEmail(String email) {
        List<Order> orders = orderRepository.findByEmailOrderByCreatedAtDesc(email);
        if (orders.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found");
        }
        return orders;
    }
}
