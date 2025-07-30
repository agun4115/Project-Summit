package com.sysco.user_service.service;

import java.util.List;

import com.sysco.user_service.dto.request.UserSignupRequest;
import com.sysco.user_service.dto.request.UserUpdateRequest;
import com.sysco.user_service.dto.response.UserResponse;

public interface UserService {

    UserResponse signupUser(UserSignupRequest userSignupRequest);

    UserResponse getUserById(Long userId);

    // List<UserResponse> getAllUsers();

    // UserResponse updateUser(Long userId, UserUpdateRequest userUpdateRequest);

    // void deleteUser(Long userId);
}
