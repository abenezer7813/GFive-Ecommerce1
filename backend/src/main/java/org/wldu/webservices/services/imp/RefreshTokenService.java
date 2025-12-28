package org.wldu.webservices.services.imp;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.wldu.webservices.auths.User;
import org.wldu.webservices.auths.UserRepository;
import org.wldu.webservices.entities.RefreshToken;
import org.wldu.webservices.repositories.RefreshTokenRepository;

import java.time.Instant;
import java.util.UUID;

@Service
public class RefreshTokenService {
    private static final long REFRESH_TOKEN_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days
   /// private static final long REFRESH_TOKEN_DURATION =60* 1000; // 7 days

    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;

    public RefreshTokenService(
            RefreshTokenRepository refreshTokenRepository,
            UserRepository userRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.userRepository = userRepository;
    }
    @Transactional
    public RefreshToken createRefreshToken(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        refreshTokenRepository.deleteByUser(user);

        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setUser(user);
        refreshToken.setToken(UUID.randomUUID().toString());
        refreshToken.setExpiryDate(
                Instant.now().plusMillis(REFRESH_TOKEN_DURATION)
        );

        return refreshTokenRepository.save(refreshToken);
    }

    public RefreshToken verifyExpiration(RefreshToken token) {

        if (token.getExpiryDate().isBefore(Instant.now())) {
            refreshTokenRepository.delete(token);
            throw new RuntimeException("Refresh token expired");
        }

        return token;
    }
}
