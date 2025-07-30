package com.sysco.category_service.dto.response;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class ErrorResponse {
    private LocalDateTime timestamp;
    private String errorMessage;
    private String errorDetails;
    private String errorCode;
    
    public ErrorResponse(String errorMessage, String errorDetails, String errorCode) {
        this.timestamp = LocalDateTime.now();
        this.errorMessage = errorMessage;
        this.errorDetails = errorDetails;
        this.errorCode = errorCode;
    }
}
