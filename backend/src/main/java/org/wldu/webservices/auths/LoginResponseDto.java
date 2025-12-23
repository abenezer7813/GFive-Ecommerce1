package org.wldu.webservices.auths;

public class LoginResponseDto {

    private Long id;
    private String email;
    private String message;

    private String token;

    public LoginResponseDto(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }
}
