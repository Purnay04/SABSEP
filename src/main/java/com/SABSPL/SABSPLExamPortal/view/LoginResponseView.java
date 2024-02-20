package com.SABSPL.SABSPLExamPortal.view;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class LoginResponseView implements Serializable {
    private String userName;
    private String token;
}
