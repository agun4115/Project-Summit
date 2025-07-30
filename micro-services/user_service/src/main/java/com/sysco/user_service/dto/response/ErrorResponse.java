package com.sysco.user_service.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ErrorResponse {
    
    private String message;
    private String path;
    private String type;
    
    public static ErrorResponse of(String message, String type) {
        return new ErrorResponse(message, null, type);
    }
    
    public static ErrorResponse of(String message, String type, String path) {
        return new ErrorResponse(message, path, type);
    }
    
    public static ErrorResponse withDetails(String message, String type, String details) {
        ErrorResponse response = new ErrorResponse();
        response.setMessage(message + " - " + details);
        response.setType(type);
        return response;
    }
}
