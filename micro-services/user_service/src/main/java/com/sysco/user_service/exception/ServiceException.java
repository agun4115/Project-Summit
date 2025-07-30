package com.sysco.user_service.exception;

import com.sysco.user_service.utils.ExceptionType;

public abstract class ServiceException extends RuntimeException {

    public ServiceException(String message) {
        super(message);
    }

    public ServiceException(String message, Throwable cause) {
        super(message, cause);
    }

    public abstract ExceptionType getExceptionType();
}
