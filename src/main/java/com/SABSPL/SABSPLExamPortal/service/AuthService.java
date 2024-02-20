package com.SABSPL.SABSPLExamPortal.service;

import com.SABSPL.SABSPLExamPortal.enums.AuthenticateRole;
import com.SABSPL.SABSPLExamPortal.enums.Role;
import com.SABSPL.SABSPLExamPortal.exception.UserAlreadyExistException;
import com.SABSPL.SABSPLExamPortal.model.UserValue;
import com.SABSPL.SABSPLExamPortal.util.JwtTokenUtil;
import com.SABSPL.SABSPLExamPortal.view.AuthRequestView;
import com.SABSPL.SABSPLExamPortal.view.LoginResponseView;
import com.SABSPL.SABSPLExamPortal.view.SignupRequestView;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtTokenUtil jwtTokenUtil;
    private final PasswordEncoder passwordEncoder;

    public Optional<LoginResponseView> doLogin(AuthRequestView authRequestView, AuthenticateRole authForRole) throws BadCredentialsException {
        final Authentication authentication = authenticate(authRequestView.getUsername(), authRequestView.getPassword());
        if(hasRole(authentication, authForRole.equals(AuthenticateRole.admin) ? Role.ADMIN.name() : Role.CANDIDATE.name())) {
            User user = (User) authentication.getPrincipal();
            return Optional.of(LoginResponseView
                                .builder()
                                .userName(user.getUsername())
                                .token(jwtTokenUtil.generateJwtToken(authentication))
                                .build());
        }
        throw new BadCredentialsException(String.format("Login failed for %s", authRequestView.getUsername()));
    }

    private boolean hasRole(Authentication authentication, String roleName) {
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        return authorities.stream().anyMatch(authority -> authority.getAuthority().equals(roleName));
    }

    public Optional<?> doSignup(SignupRequestView signupView, AuthenticateRole authForRole) throws UserAlreadyExistException, BadCredentialsException {
        UserValue newUser = UserValue
                            .builder()
                            .userName(signupView.getUsername())
                            .email(signupView.getEmail())
                            .password(passwordEncoder.encode(signupView.getPassword()))
                            .role(authForRole.equals(AuthenticateRole.admin) ? Role.ADMIN : Role.CANDIDATE)
                            .build();
        userService.addUser(newUser);
        final Authentication authentication = authenticate(signupView.getUsername(), signupView.getPassword());
        User user = (User) authentication.getPrincipal();
        return Optional.of(LoginResponseView
                .builder()
                .userName(user.getUsername())
                .token(jwtTokenUtil.generateJwtToken(authentication))
                .build());

    }

    private Authentication authenticate(String username, String password) throws BadCredentialsException{
        return authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
        );
    }
}
