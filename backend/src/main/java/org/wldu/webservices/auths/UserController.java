package org.wldu.webservices.auths;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.wldu.webservices.dto.product.ProductResponseDTO;
import org.wldu.webservices.dto.user.UpdateUserRequest;
import org.wldu.webservices.dto.user.UserResponseDto;
import org.wldu.webservices.entities.Product;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponseDto> getMyProfile() {

        User user = userService.getCurrentUser();

        return ResponseEntity.ok(new UserResponseDto(user));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Page<UserResponseDto> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction
    ) {
        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();
        PageRequest pageable = PageRequest.of(page, size, sort);

        return userService.getAllUsers(pageable).map(UserResponseDto::new);

    }

    @PutMapping("/me")
    public ResponseEntity<UserResponseDto> updateCurrentUser(
            @RequestBody UpdateUserRequest request,
            Authentication authentication
    ) {
        String email = authentication.getName(); // from JWT

        User updatedUser = userService
                .updateUser(email, request);

        return ResponseEntity.ok(
                new UserResponseDto(updatedUser)
        );
    }
    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> updateUserStatus(
            @PathVariable Long id,
            @RequestParam boolean enabled) {

        userService.updateUserStatus(id, enabled);
        return ResponseEntity.noContent().build();
    }

}

