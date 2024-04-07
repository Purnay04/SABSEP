package com.SABSPL.sabsep.filters;

import com.SABSPL.sabsep.constants.Role;
import com.SABSPL.sabsep.services.UserService;
import com.SABSPL.sabsep.utils.JwtUtil;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

@Component
@RequiredArgsConstructor
public class JwtFilterRequest extends OncePerRequestFilter {

    private final UserService userDetailsService;
    private final JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        final String authorizationHeader = request.getHeader("Authorization");
        String username = null;
        String jwt = null;

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7);
            username = jwtUtil.extractUsername(jwt);
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
            if (jwtUtil.validateToken(jwt, userDetails)) {
                request.setAttribute("email",userDetails.getUsername());
                var claims = jwtUtil.extractAllClaims(jwt);
                var role = claims.get("role");
                var authorities = new ArrayList<SimpleGrantedAuthority>();
                if (role!=null){
                    if(request.getRequestURI().contains(Role.ROLE_ADMIN) && !role.equals(Role.ROLE_ADMIN)){
                        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                        return;
                    }
                    request.setAttribute("role",role);
                    authorities.add(new SimpleGrantedAuthority((String) role));
                }
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, authorities);
                usernamePasswordAuthenticationToken
                        .setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }
        }

        chain.doFilter(request, response);
    }

}
