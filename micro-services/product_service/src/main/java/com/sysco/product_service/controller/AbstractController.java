package com.sysco.product_service.controller;

import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;
import org.slf4j.Logger;

/**
 * Abstract base class for controllers providing common functionalities.
 */
public abstract class AbstractController {

    protected final Logger logger = LoggerFactory.getLogger(getClass());

    protected void logRequest(String action, Object... details) {
        logger.info("{} request received with details: {}", action, details);
    }

    protected ResponseEntity<?> createSuccessResponse(String message, HttpStatus status) {
        return ResponseEntity.status(status).body(Map.of("message", message));
    }

    protected ResponseEntity<?> createSuccessResponse(String message, Object data, HttpStatus status) {
        return ResponseEntity.status(status).body(Map.of("message", message, "data", data));
    }

    protected ResponseEntity<?> createPageableSuccessResponse(String message, Page<?> page, HttpStatus status) {
        Map<String, Object> response = new HashMap<>();
        logRequest("Shit", page.getContent());
        response.put("message", message);
        response.put("data", page.getContent());
        response.put("totalElements", page.getTotalElements());
        response.put("totalPages", page.getTotalPages());
        response.put("size", page.getSize());
        response.put("number", page.getNumber());
        response.put("first", page.isFirst());
        response.put("last", page.isLast());
        response.put("numberOfElements", page.getNumberOfElements());
        response.put("empty", page.isEmpty());
        
        return ResponseEntity.status(status).body(response);
    }

    protected ResponseEntity<?> createErrorResponse(String message, HttpStatus status) {
        return ResponseEntity.status(status).body(Map.of("error", message));
    }

    protected ResponseEntity<?> createErrorResponse(String message, Object details, HttpStatus status) {
        return ResponseEntity.status(status).body(Map.of("error", message, "details", details));
    }
}
