package com.sysco.user_service.dto.request;

import com.sysco.user_service.entity.User;
import lombok.Data;

@Data
public class UserUpdateRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
}
