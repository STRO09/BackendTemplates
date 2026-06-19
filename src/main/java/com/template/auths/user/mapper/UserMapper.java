package com.template.auths.user.mapper;

import com.template.auths.user.dto.request.CreateUserRequest;
import com.template.auths.user.dto.request.UpdateUserRequest;
import com.template.auths.user.dto.response.UserResponse;
import com.template.auths.user.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public User toEntity(CreateUserRequest request) {

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());

        // Password encoding will happen in the service
        user.setPassword(request.getPassword());

        return user;
    }

    public void updateEntity(User user, UpdateUserRequest request) {

        user.setName(request.getName());
        user.setEmail(request.getEmail());
    }

    public UserResponse toResponse(User user) {

        UserResponse response = new UserResponse();

        response.setId(user.getId());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        response.setCreatedAt(user.getCreatedAt());

        return response;
    }
}