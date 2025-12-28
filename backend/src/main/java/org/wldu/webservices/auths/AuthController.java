package org.wldu.webservices.auths;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.web.bind.annotation.*;
import org.wldu.webservices.entities.RefreshToken;
import org.wldu.webservices.repositories.RefreshTokenRepository;
import org.wldu.webservices.services.imp.RefreshTokenService;


@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final RefreshTokenService refreshTokenService;
    private final RefreshTokenRepository refreshTokenRepository;

    public AuthController(UserService userService, AuthenticationManager authenticationManager, JwtUtil jwtUtil, RefreshTokenService refreshTokenService, RefreshTokenRepository refreshTokenRepository) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.refreshTokenService = refreshTokenService;
        this.refreshTokenRepository = refreshTokenRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(
            @RequestBody LoginRequestDto requestDto) {

        User user = userService.login(requestDto);
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        requestDto.getEmail(),
                        requestDto.getPassword()
                )
        );
        String role = user.getRoles()
                .iterator()
                .next()
                .getName();
        String token=jwtUtil.generateToken(user.getEmail(),role);
        RefreshToken refreshToken= refreshTokenService.createRefreshToken(requestDto.getEmail());

        return ResponseEntity.ok( new LoginResponseDto(token,refreshToken.getToken()));
    }
    @PostMapping("/refresh")
    public ResponseEntity<LoginResponseDto> refreshToken(
            @RequestBody RefreshTokenRequest request) {

        RefreshToken refreshToken = refreshTokenRepository
                .findByToken(request.getRefreshToken())
                .map(refreshTokenService::verifyExpiration)
                .orElseThrow(() -> new RuntimeException("Invalid refresh token"));

        User user = refreshToken.getUser();
        String role = user.getRoles()
                .iterator()
                .next()
                .getName();
        // ✅ SAME token generation logic as login
        String newAccessToken = jwtUtil.generateToken(
                user.getEmail(),
                role
        );

        return ResponseEntity.ok(
                new LoginResponseDto(newAccessToken, request.getRefreshToken())
        );
    }

}
