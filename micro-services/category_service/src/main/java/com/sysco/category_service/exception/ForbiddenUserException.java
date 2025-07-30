package com.sysco.category_service.exception;

public class ForbiddenUserException extends RuntimeException {
    
    public ForbiddenUserException(String message) {
        super(message);
    }
}
