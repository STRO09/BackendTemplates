package com.template.auths.user.service;

import com.template.auths.user.dto.request.CreateUserRequest;
import com.template.auths.user.dto.request.UpdateUserRequest;
import com.template.auths.user.dto.response.UserResponse;

import java.util.List;

public interface UserService {

    List<UserResponse> getAllUsers();

    UserResponse getUserById(Long id);

    UserResponse createUser(CreateUserRequest request);

    UserResponse updateUser(Long id, UpdateUserRequest request);

    void deleteUser(Long id);

}