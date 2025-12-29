package org.wldu.webservices.auths;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.wldu.webservices.dto.user.UpdateUserRequest;
import org.wldu.webservices.entities.Role;
import org.wldu.webservices.exception.BadRequestException;
import org.wldu.webservices.exception.ResourceNotFoundException;
import org.wldu.webservices.repositories.RoleRepository;
import org.wldu.webservices.security.SecurityUtils;


import java.time.LocalDateTime;
import java.util.Collections;

@Slf4j
@Service
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    public UserService(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public ResponseEntity<?> register(RegisterRequestDto request) {

        if (userRepository.existsByEmail(request.getEmail())) {


            return ResponseEntity
                    .badRequest()
                    .body("Email already exists");
        }

        Role userRole = roleRepository.findByName("ROLE_USER")
                .orElseThrow(() -> new ResourceNotFoundException("Role not found"));

        User user = new User();
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());
        user.setRoles(Collections.singleton(userRole)); // default role
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setAge(request.getAge());
        user.setGender(request.getGender());
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());

         userRepository.save(user);
         return ResponseEntity.status(201).body(new RegisterResponseDto(user));
    }
    //login

    public User login(LoginRequestDto request) {
        User user=userRepository.findByEmail(request.getEmail()).
                orElseThrow(() -> new ResourceNotFoundException("User not found"));
        if(!passwordEncoder.matches(request.getPassword(),
                user.getPassword())) {
            throw new BadRequestException("Wrong password");
        }

        return user;
    }
    public User getCurrentUser() {

        String email = SecurityUtils.getCurrentUserEmail();

        if (email == null) {
            throw new RuntimeException("No authenticated user");
        }

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
    public Page<User> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable);
    }
    public User updateUser(String email, UpdateUserRequest request) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setAge(request.getAge());
        user.setGender(request.getGender());

        return userRepository.save(user);
    }

}

