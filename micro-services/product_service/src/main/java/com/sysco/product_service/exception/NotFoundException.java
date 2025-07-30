package com.sysco.product_service.exception;

import com.sysco.product_service.utils.ExceptionType;

public class NotFoundException extends ServiceException {

    public NotFoundException(String message) {
        super(message);
    }

    @Override
    public ExceptionType getExceptionType() {
        return ExceptionType.NOT_FOUND;
    }
}
