package com.SABSPL.SABSPLExamPortal.view;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SignupRequestView {

//    @Pattern(regexp = RegexpConstants.USERNAME_REGEX, message = "Please re-enter the User Name with only Alphabets, Number & only Special Character As _ !")
    private String username;

//    @Min(value = 8)
//    @Pattern(regexp = RegexpConstants.PASSWORD_REGEX, message = "Please re-enter the Password!")
    private String password;

    private String email;

    @Override
    public String toString() {
        return "SignupRequestView{" +
                "userName='" + username + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
