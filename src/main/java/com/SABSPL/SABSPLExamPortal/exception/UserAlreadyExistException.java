package com.SABSPL.SABSPLExamPortal.exception;

import lombok.Getter;

@Getter
public class UserAlreadyExistException extends Throwable {
    final String msg;
    public UserAlreadyExistException(String token) {
        msg = String.format("%s Already in use!!%n", token);
    }
}
