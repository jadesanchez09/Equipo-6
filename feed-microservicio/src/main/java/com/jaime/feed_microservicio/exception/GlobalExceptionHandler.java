package com.jaime.feed_microservicio.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // Maneja errores cuando no se encuentra algo
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ApiError> manejarRuntimeException(RuntimeException ex) {

        ApiError error = new ApiError(ex.getMessage(), 404);

        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    // Maneja errores generales
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiError> manejarExceptionGeneral(Exception ex) {

        ApiError error = new ApiError("Error interno del servidor", 500);

        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}