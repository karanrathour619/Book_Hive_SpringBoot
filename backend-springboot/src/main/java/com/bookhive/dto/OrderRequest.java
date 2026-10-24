package com.bookhive.dto;

import lombok.Data;

import java.util.List;

@Data
public class OrderRequest {
    private String name;
    private String email;
    private Long phone;
    private Double totalPrice;
    private List<String> productIds;
    private Address address;

    @Data
    public static class Address {
        private String city;
        private String country;
        private String state;
        private String zipcode;
    }
}
