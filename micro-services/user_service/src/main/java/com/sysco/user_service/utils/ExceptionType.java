package com.sysco.user_service.utils;

public enum ExceptionType {
    NOT_FOUND,
    INVALID_INPUT,
    DATABASE_ERROR,
    UNAUTHORIZED,
    FORBIDDEN,
    UNKNOWN_ERROR,
    INTERNAL_SERVER_ERROR,
    DUPLICATE_EMAIL;

    public String getType() {
        return this.name();
    }
}
