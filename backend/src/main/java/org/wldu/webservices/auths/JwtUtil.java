package org.wldu.webservices.auths;

import io.jsonwebtoken.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {

    private static final String SECRET = "THISISAVERYSECRETKEY123456789natiandzekiandme";
    private static final long EXPIRATION = 60*60* 1000; // 1 hour

    // ✅ Generate token
    public String generateToken(String email, String role) {

        return Jwts.builder()
                .setSubject(email)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(
                        new Date(System.currentTimeMillis() + EXPIRATION)
                )
                .signWith(SignatureAlgorithm.HS256, SECRET)
                .compact();
    }

    // ✅ Extract username (email)
    public String extractUsername(String token) {
        return extractClaims(token).getSubject();
    }
    public String extractRole(String token) {
        return extractClaims(token).get("role", String.class);
    }


    // ✅ Validate token
    public boolean isTokenValid(String token, UserDetails userDetails) {
        String username = extractUsername(token);
        return username.equals(userDetails.getUsername())
                && !isTokenExpired(token);
    }

    // 🔹 Helpers
    private boolean isTokenExpired(String token) {
        return extractClaims(token)
                .getExpiration()
                .before(new Date());
    }

    private Claims extractClaims(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET)
                .parseClaimsJws(token)
                .getBody();
    }
}
