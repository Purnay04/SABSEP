package com.SABSPL.SABSPLExamPortal.view;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
public class AuthRequestView implements Serializable {
    @NonNull
    private String username;

    @NonNull
    private String password;
}
