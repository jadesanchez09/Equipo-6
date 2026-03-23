package com.example.user_service.service;

import com.example.user_service.exception.EmailAlreadyExistsException;
import com.example.user_service.exception.UsernameAlreadyExistsException;
import com.example.user_service.exception.UserNotFoundException;
import com.example.user_service.model.User;
import com.example.user_service.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder; // agregado

    // Crear usuario
    public User createUser(User user) {

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new EmailAlreadyExistsException(user.getEmail());
        }

        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new UsernameAlreadyExistsException(user.getUsername());
        }

        //  ENCRIPTAR PASSWORD
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public User updateUser(Long id, User updatedUser) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));

        if (updatedUser.getEmail() != null && !updatedUser.getEmail().equals(user.getEmail())) {
            userRepository.findByEmail(updatedUser.getEmail()).ifPresent(found -> {
                if (!found.getId().equals(user.getId())) {
                    throw new EmailAlreadyExistsException(updatedUser.getEmail());
                }
            });
            user.setEmail(updatedUser.getEmail());
        }

        if (updatedUser.getUsername() != null && !updatedUser.getUsername().equals(user.getUsername())) {
            userRepository.findByUsername(updatedUser.getUsername()).ifPresent(found -> {
                if (!found.getId().equals(user.getId())) {
                    throw new UsernameAlreadyExistsException(updatedUser.getUsername());
                }
            });
            user.setUsername(updatedUser.getUsername());
        }

        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));

        user.setActive(false);
        userRepository.save(user);
    }
}