package com.sysco.product_service.utils;

public class Sanitization {
    
    public static String nullToEmptyString(String input) {
        return input == null ? "" : input.trim();
    }
    
    public static String nullToNull(String input) {
        return (input == null || input.trim().isEmpty()) ? null : input.trim();
    }
}