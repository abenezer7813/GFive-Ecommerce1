package org.wldu.webservices.auths;

public class LoginResponseDto {


    private String accessToken;
    private String refreshToken;


    public LoginResponseDto(String accessToken, String refreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

    public String getToken() {
        return this.accessToken;
    }
    public String getRefreshToken() {return this.refreshToken;}
}
