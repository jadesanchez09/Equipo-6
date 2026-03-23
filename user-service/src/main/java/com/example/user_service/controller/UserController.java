package com.example.user_service.controller;

import com.example.user_service.dto.UserRequest;
import com.example.user_service.dto.UserResponse;
import com.example.user_service.model.User;
import com.example.user_service.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    // POST /api/users  (registro)
    @PostMapping
    public ResponseEntity<UserResponse> create(@Valid @RequestBody UserRequest req) {

        // Por ahora guardamos el password tal cual (en el siguiente paso lo encriptamos con BCrypt)
        User user = User.builder()
                .username(req.getUsername())
                .email(req.getEmail())
                .password(req.getPassword())
                .active(true)
                .build();

        User saved = service.createUser(user);

        UserResponse resp = UserResponse.builder()
                .id(saved.getId())
                .username(saved.getUsername())
                .email(saved.getEmail())
                .createdAt(saved.getCreatedAt())
                .build();

        return ResponseEntity.status(HttpStatus.CREATED).body(resp);
    }

    // GET /api/users/{id} (consulta perfil)
    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getById(@PathVariable Long id) {

        User user = service.getUserById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado: " + id));

        UserResponse resp = UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .createdAt(user.getCreatedAt())
                .build();

        return ResponseEntity.ok(resp);
    }

    // PUT /api/users/{id} (actualización datos básicos)
    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> update(@PathVariable Long id,
                                               @Valid @RequestBody UserRequest req) {

        User updatedUser = User.builder()
                .username(req.getUsername())
                .email(req.getEmail())
                .build();

        User saved = service.updateUser(id, updatedUser);

        UserResponse resp = UserResponse.builder()
                .id(saved.getId())
                .username(saved.getUsername())
                .email(saved.getEmail())
                .createdAt(saved.getCreatedAt())
                .build();

        return ResponseEntity.ok(resp);
    }

    // DELETE /api/users/{id} (borrado lógico)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}