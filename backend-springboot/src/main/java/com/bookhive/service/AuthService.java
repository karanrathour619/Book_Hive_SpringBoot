package com.bookhive.service;

import com.bookhive.dto.AdminLoginRequest;
import com.bookhive.dto.AdminLoginResponse;
import com.bookhive.model.User;
import com.bookhive.repository.UserRepository;
import com.bookhive.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AdminLoginResponse adminLogin(AdminLoginRequest req) {
        User admin = userRepository.findByUsername(req.getUsername())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Admin not found!"));

        if (!passwordEncoder.matches(req.getPassword(), admin.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid password!");
        }

        String token = jwtUtil.generateToken(admin.getId(), admin.getUsername(), admin.getRole());

        return AdminLoginResponse.builder()
                .message("Authentication successful")
                .token(token)
                .user(AdminLoginResponse.UserInfo.builder()
                        .username(admin.getUsername())
                        .role(admin.getRole())
                        .build())
                .build();
    }
}
