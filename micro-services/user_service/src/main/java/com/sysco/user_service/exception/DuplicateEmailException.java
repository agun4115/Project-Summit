package com.sysco.user_service.exception;

import com.sysco.user_service.utils.ExceptionType;

public class DuplicateEmailException extends ServiceException {

    public DuplicateEmailException(String message) {
        super(message);
    }

    @Override
    public ExceptionType getExceptionType() {
        return ExceptionType.DUPLICATE_EMAIL;
    }
}
