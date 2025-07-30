package com.sysco.user_service.dto.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import com.sysco.user_service.dto.request.UserSignupRequest;
import com.sysco.user_service.dto.response.UserResponse;
import com.sysco.user_service.entity.User;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {
    UserResponse userToUserResponse(User user);
    List<UserResponse> usersToUserResponses(List<User> users);
    User userSignupRequestToUser(UserSignupRequest userSignupRequest);
}
