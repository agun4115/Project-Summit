package com.sysco.user_service.controller;

import java.util.List;

import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.sysco.user_service.dto.response.UserResponse;
import com.sysco.user_service.service.UserService;
import com.sysco.user_service.dto.request.UserSignupRequest;
import com.sysco.user_service.dto.request.UserUpdateRequest;

@RestController
@RequestMapping("/api/v1/users")
@CrossOrigin(origins = {
    "http://localhost:9001",
}, allowCredentials = "true")
@Slf4j
public class UserController extends AbstractController {

    private final UserService userService;
    
    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signupUser(@RequestBody UserSignupRequest request) {
        logRequest("User Signup", request);
        UserResponse created = userService.signupUser(request);
        return createSuccessResponse("User signed up successfully", created, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        logRequest("Get User by ID", id);
        UserResponse user = userService.getUserById(id);
        return createSuccessResponse("User retrieved successfully", user, HttpStatus.OK);
    }

    // @GetMapping("")    
    // public ResponseEntity<?> getAllUsers() {
    //     logRequest("Get All Users");
    //     List<UserResponse> users = userService.getAllUsers();
    //     return createSuccessResponse("Users retrieved successfully", users, HttpStatus.OK);
    // }

    // @PutMapping("/{id}")
    // public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody UserUpdateRequest request) {
    //     logRequest("Update User", id, request);
    //     UserResponse updated = userService.updateUser(id, request);
    //     return createSuccessResponse("User updated successfully", updated, HttpStatus.OK);
    // }

    // @DeleteMapping("/{id}")
    // public ResponseEntity<?> deleteUser(@PathVariable Long id) {
    //     logRequest("Delete User", id);
    //     userService.deleteUser(id);
    //     return createSuccessResponse("User deleted successfully", null, HttpStatus.OK);
    // }
}
