package com.SABSPL.SABSPLExamPortal.exception;

import io.micrometer.common.util.StringUtils;
import lombok.Getter;

@Getter
public class NoSuchElementPresentException extends RuntimeException {
    String msg;

    public NoSuchElementPresentException() {
        super("Given element is not present");
    }

    public NoSuchElementPresentException(String token) {
        super("No such %s element present".formatted(token));
        msg = String.format("No such %s element present", token);
    }

    public NoSuchElementPresentException(String token, String msg) {
        super("No such %s element present".formatted(token));
        if(StringUtils.isNotEmpty(msg))
            msg = String.format(msg, token);
        else
            msg = String.format("No such %s element present", token);
    }
}
