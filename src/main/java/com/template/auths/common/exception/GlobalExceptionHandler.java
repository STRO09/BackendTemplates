package com.template.auths.common.exception;

import com.template.auths.common.response.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<?> handleApiException(ApiException ex) {

        return ApiResponses.error(
                ex.getStatus(),
                ex.getMessage()
        );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleUnexpectedException(Exception ex) {

        ex.printStackTrace();

        return ApiResponses.error(
                org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR,
                "Something went wrong."
        );
    }

}