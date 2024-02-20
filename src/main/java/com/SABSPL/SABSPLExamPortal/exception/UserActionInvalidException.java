package com.SABSPL.SABSPLExamPortal.exception;

public class UserActionInvalidException extends RuntimeException {
    String msg;

    public UserActionInvalidException(String token) {
        super("No such %s action present".formatted(token));
        msg = String.format("No such %s element present", token);
    }
}
