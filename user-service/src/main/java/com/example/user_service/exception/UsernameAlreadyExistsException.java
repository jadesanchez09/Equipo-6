package com.example.user_service.exception;

public class UsernameAlreadyExistsException extends RuntimeException {
    public UsernameAlreadyExistsException(String username) {
        super("El username ya está registrado: " + username);
    }
}