package com.sysco.user_service.service;

import com.sysco.user_service.dto.mapper.UserMapper;
import com.sysco.user_service.dto.request.UserSignupRequest;
import com.sysco.user_service.dto.request.UserUpdateRequest;
import com.sysco.user_service.dto.response.UserResponse;
import com.sysco.user_service.entity.User;
import com.sysco.user_service.exception.DuplicateEmailException;
import com.sysco.user_service.exception.NotFoundException;
import com.sysco.user_service.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    
    @Override
    @Transactional
    public UserResponse signupUser(UserSignupRequest userSignupRequest) {
        log.info("Signing up new user with email: {}", userSignupRequest.getEmail());
        
        // Check if email already exists
        if (userRepository.existsByEmail(userSignupRequest.getEmail())) {
            throw new DuplicateEmailException("Email already exists: " + userSignupRequest.getEmail());
        }
        
        User user = userMapper.userSignupRequestToUser(userSignupRequest);
        User savedUser = userRepository.save(user);
        
        log.info("User created successfully with id: {}", savedUser.getId());
        return userMapper.userToUserResponse(savedUser);
    }

    @Override
    public UserResponse getUserById(Long userId) {
        log.info("Getting user by id: {}", userId);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found with id: " + userId));
        return userMapper.userToUserResponse(user);
    }

    // @Override
    // public List<UserResponse> getAllUsers() {
    //     log.info("Getting all users");
    //     List<User> users = userRepository.findAll();
    //     return userMapper.usersToUserResponses(users);
    // }

    // @Override
    // @Transactional
    // public UserResponse updateUser(Long userId, UserUpdateRequest userUpdateRequest) {
    //     log.info("Updating user with id: {}", userId);
    //     User existing = userRepository.findById(userId)
    //             .orElseThrow(() -> new NotFoundException("User not found with id: " + userId));

    //     // Check if email is being changed and if new email already exists
    //     if (userUpdateRequest.getEmail() != null && 
    //         !userUpdateRequest.getEmail().equals(existing.getEmail()) &&
    //         userRepository.existsByEmail(userUpdateRequest.getEmail())) {
    //         throw new DuplicateEmailException("Email already exists: " + userUpdateRequest.getEmail());
    //     }

    //     // Update fields if they are provided
    //     if (userUpdateRequest.getFirstName() != null) {
    //         existing.setFirstName(userUpdateRequest.getFirstName());
    //     }
    //     if (userUpdateRequest.getLastName() != null) {
    //         existing.setLastName(userUpdateRequest.getLastName());
    //     }
    //     if (userUpdateRequest.getEmail() != null) {
    //         existing.setEmail(userUpdateRequest.getEmail());
    //     }
    //     if (userUpdateRequest.getPhoneNumber() != null) {
    //         existing.setPhoneNumber(userUpdateRequest.getPhoneNumber());
    //     }

    //     User saved = userRepository.save(existing);
    //     return userMapper.userToUserResponse(saved);
    // }

    // @Override
    // @Transactional
    // public void deleteUser(Long userId) {
    //     log.info("Deleting user with id: {}", userId);
    //     if (!userRepository.existsById(userId)) {
    //         throw new NotFoundException("User not found with id: " + userId);
    //     }
    //     userRepository.deleteById(userId);
    //     log.info("User deleted successfully with id: {}", userId);
    // }
}
