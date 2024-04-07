package com.SABSPL.sabsep.controller;

import com.SABSPL.sabsep.constants.Role;
import com.SABSPL.sabsep.models.AuthenticationRequest;
import com.SABSPL.sabsep.models.AuthenticationResponse;
import com.SABSPL.sabsep.models.User;
import com.SABSPL.sabsep.services.UserService;
import com.SABSPL.sabsep.utils.JwtUtil;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletRequest;


@Data
@Controller
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class UserController {

    private final Logger logger = LoggerFactory.getLogger(UserController.class);
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtUtil jwtTokenUtil;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/admin/signup")
    ResponseEntity<?> addAdmin(@RequestBody User user, HttpServletRequest request){
        String role = (String) request.getAttribute("role");
        if (!role.equals(Role.ROLE_ADMIN))  throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Admin can only be created by another admin");
        if (userService.findByEmail(user.getEmail()))   throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Email Already Exists");
        user.setRole(Role.ROLE_ADMIN);
        userService.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body("New Admin Created.");
    }

    @PostMapping("/signup")
    @ResponseBody
    public ResponseEntity<?> signup(@RequestBody User user){
        if (userService.findByEmail(user.getEmail()))   return ResponseEntity.badRequest().body("Email Already Exists");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Role.ROLE_USER);
        userService.save(user);
        var jwt = jwtTokenUtil.generateToken(user);
        return ResponseEntity.ok(new AuthenticationResponse(jwt, user.getUsername(), user.getEmail()));
    }

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest){
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword()));
        }catch (Exception e){
            logger.error(String.format("BadCredentialsException:: at signup controller: %s", e.getMessage()));
            return ResponseEntity.badRequest().body("Incorrect Username or Password");
        }
        final User user = userService.getUserByEmail(authenticationRequest.getUsername());
        var jwt = jwtTokenUtil.generateToken(user);
        return ResponseEntity.ok(new AuthenticationResponse(jwt, user.getUsername(), user.getEmail()));
    }
}
