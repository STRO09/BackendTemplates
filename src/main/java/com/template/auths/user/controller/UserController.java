package com.template.auths.user.controller;

import com.template.auths.common.endpoints.UserEndpoints;
import com.template.auths.common.response.ApiResponse;
import com.template.auths.common.response.ApiResponses;
import com.template.auths.user.dto.request.CreateUserRequest;
import com.template.auths.user.dto.request.UpdateUserRequest;
import com.template.auths.user.dto.response.UserResponse;
import com.template.auths.user.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(UserEndpoints.BASE)
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(UserEndpoints.GET_ALL)
    public ResponseEntity<ApiResponse<List<UserResponse>>> getAllUsers() {

        return ApiResponses.ok(
                "Users fetched successfully.",
                userService.getAllUsers()
        );
    }

    @GetMapping(UserEndpoints.GET_BY_ID)
    public ResponseEntity<ApiResponse<UserResponse>> getUserById(
            @PathVariable Long id) {

        return ApiResponses.ok(
                "User fetched successfully.",
                userService.getUserById(id)
        );
    }

    @PostMapping(UserEndpoints.CREATE)
    public ResponseEntity<ApiResponse<UserResponse>> createUser(
            @Valid @RequestBody CreateUserRequest request) {

        return ApiResponses.created(
                "User created successfully.",
                userService.createUser(request)
        );
    }

    @PutMapping(UserEndpoints.UPDATE)
    public ResponseEntity<ApiResponse<UserResponse>> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UpdateUserRequest request) {

        return ApiResponses.ok(
                "User updated successfully.",
                userService.updateUser(id, request)
        );
    }

    @DeleteMapping(UserEndpoints.DELETE)
    public ResponseEntity<ApiResponse<Void>> deleteUser(
            @PathVariable Long id) {

        userService.deleteUser(id);

        return ApiResponses.noContent(
                "User deleted successfully."
        );
    }
}