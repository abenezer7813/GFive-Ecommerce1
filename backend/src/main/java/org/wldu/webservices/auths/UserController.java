package org.wldu.webservices.auths;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.wldu.webservices.dto.user.UpdateUserRequest;
import org.wldu.webservices.dto.user.UserResponseDto;

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

}

