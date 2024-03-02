package com.SABSPL.backend.models;

import lombok.Data;

@Data
public class AuthenticationRequest {
    private String username;
    private String password;
}
