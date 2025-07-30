package com.sysco.category_service.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.bind.annotation.ExceptionHandler;
import com.sysco.category_service.dto.response.ErrorResponse;
import com.sysco.category_service.utils.ExceptionType;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception ex, WebRequest request) {
        logger.error("An error occurred: {}", ex.getMessage(), ex);
        ErrorResponse errorResponse = new ErrorResponse(
                ex.getMessage(),
                request.getDescription(false),
                ExceptionType.INTERNAL_SERVER_ERROR.getType()
        );
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFoundException(NotFoundException ex, WebRequest request) {
        logger.warn("Resource not found: {}", ex.getMessage());
        ErrorResponse errorResponse = new ErrorResponse(
                ex.getMessage(),
                request.getDescription(false),
                ExceptionType.NOT_FOUND.getType()
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
    }

    @ExceptionHandler(InvalidInputException.class)
    public ResponseEntity<ErrorResponse> handleInvalidInputException(InvalidInputException ex, WebRequest request) {
        logger.warn("Invalid input: {}", ex.getMessage());
        ErrorResponse errorResponse = new ErrorResponse(
                ex.getMessage(),
                request.getDescription(false),
                ExceptionType.INVALID_INPUT.getType()
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }

    @ExceptionHandler(ForbiddenUserException.class)
    public ResponseEntity<ErrorResponse> handleForbiddenUserException(ForbiddenUserException ex, WebRequest request) {
        logger.warn("Forbidden access: {}", ex.getMessage());
        ErrorResponse errorResponse = new ErrorResponse(
                ex.getMessage(),
                request.getDescription(false),
                ExceptionType.FORBIDDEN.getType()
        );
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(errorResponse);
    }
}
