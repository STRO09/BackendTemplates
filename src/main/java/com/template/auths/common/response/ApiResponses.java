package com.template.auths.common.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public final class ApiResponses {

    private ApiResponses() {
    }

    private static <T> ApiResponse<T> buildResponse(
            boolean success,
            HttpStatus status,
            String message,
            T data
    ) {
        return new ApiResponse<>(
                success,
                status.value(),
                message,
                data,
                java.time.LocalDateTime.now()
        );
    }

    public static <T> ResponseEntity<ApiResponse<T>> ok(String message, T data) {

        return ResponseEntity.ok(
                buildResponse(true, HttpStatus.OK, message, data)
        );
    }

    public static <T> ResponseEntity<ApiResponse<T>> created(String message, T data) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        buildResponse(true, HttpStatus.CREATED, message, data)
                );
    }

    public static ResponseEntity<ApiResponse<Void>> noContent(String message) {

        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .body(
                        buildResponse(true, HttpStatus.NO_CONTENT, message, null)
                );
    }

    public static ResponseEntity<ApiResponse<Void>> error(
            HttpStatus status,
            String message
    ) {

        return ResponseEntity
                .status(status)
                .body(
                        buildResponse(false, status, message, null)
                );
    }
}