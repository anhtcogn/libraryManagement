package com.example.librarymanagement.payload;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class LoginResponse {
    private String accessToken;
    private String tokenType = "Bearer";
    private String username;
    private String message;
    private HttpStatus statusCode;

    public LoginResponse(String accessToken) {
        this.accessToken = accessToken;
    }
}