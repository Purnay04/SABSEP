package com.SABSPL.SABSPLExamPortal.controller;

import com.SABSPL.SABSPLExamPortal.enums.AuthenticateRole;
import com.SABSPL.SABSPLExamPortal.exception.UserAlreadyExistException;
import com.SABSPL.SABSPLExamPortal.service.AuthService;
import com.SABSPL.SABSPLExamPortal.view.AuthRequestView;
import com.SABSPL.SABSPLExamPortal.view.SignupRequestView;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    private final AuthService authService;

    @PostMapping("/{AUTH_ROLE}/login")
    public ResponseEntity<?> login(@PathVariable("AUTH_ROLE") AuthenticateRole authenticateFor, @RequestBody @Valid AuthRequestView authRequestView) {
        try {
            logger.debug(String.format("In Login controller for user: %s role of %s", authRequestView.getUsername(), authenticateFor.name()));
            return ResponseEntity.ok(authService.doLogin(authRequestView, authenticateFor).orElseThrow());
        } catch (BadCredentialsException bce) {
            logger.error(String.format("BadCredentialsException:: at login controller: %s", bce.getMessage()));
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("ERROR_MSG", bce.getMessage()));
        } catch (Exception e) {
            logger.error(String.format("Exception at login controller: %s", e.getMessage()));
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/{AUTH_ROLE}/signup")
    public ResponseEntity<?> signup(@PathVariable("AUTH_ROLE") AuthenticateRole signUpFor, @RequestBody @Valid SignupRequestView signupView) {
        try {
            logger.debug(String.format("in signup controller for: %s", signupView.toString()));
            return ResponseEntity.ok(authService.doSignup(signupView, signUpFor).orElseThrow());
        } catch (UserAlreadyExistException uae) {
            logger.debug(String.format("UserAlreadyExistException:: at signup controller: %s", uae.getMessage()));
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(uae.getMsg());
        } catch (BadCredentialsException bce) {
            logger.error(String.format("BadCredentialsException:: at signup controller: %s", bce.getMessage()));
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("ERROR_MSG", bce.getMessage()));
        } catch (Exception e) {
            logger.debug(String.format("Exception at signup api: %s", e.getMessage()));
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
