package com.example.Triangle.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .authorizeHttpRequests(auth -> {
                    auth.requestMatchers("/", "/login").permitAll();

                    auth.anyRequest().authenticated();
                })
                .oauth2Login(oauth2login->{
                    oauth2login
                            .loginPage("/login")
                            .successHandler((request, response, authentication) -> response.sendRedirect("/user"));

                })
                .build();
    }

}