package com.SABSPL.SABSPLExamPortal.config;

import com.SABSPL.SABSPLExamPortal.security.CorsFilter;
import com.SABSPL.SABSPLExamPortal.security.JwtFilter;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SpringSecurityConfig {

    private final AuthenticationProvider authenticationProvider;

    private final CorsFilter corsFilter;

    private final JwtFilter jwtFilter;

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // Disable CSRF
                .csrf(AbstractHttpConfigurer::disable)

                // Set session management to stateless
                .sessionManagement((session) -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                // Set unauthorized request exception handler
                .exceptionHandling((exceptionHandler -> {
                    exceptionHandler.authenticationEntryPoint(
                            (((request, response, authException) -> {
                                response.sendError(
                                        HttpServletResponse.SC_UNAUTHORIZED,
                                        authException.getMessage()
                                );
                            }))
                    );
                }))

                // Set permission on endpoints
                .authorizeHttpRequests((requestCustomizer) -> requestCustomizer
                        // our public endpoints
                        .requestMatchers("/api/auth/**").permitAll()
                        // our private endpoints
                        .anyRequest().authenticated()
                )

                .authenticationProvider(authenticationProvider)

                // Add CorsFilter
                .addFilterBefore(
                        corsFilter,
                        UsernamePasswordAuthenticationFilter.class
                )

                // Add JWT Token filter
                .addFilterBefore(
                        jwtFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }

}
