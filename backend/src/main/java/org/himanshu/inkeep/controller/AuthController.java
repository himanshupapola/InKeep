package org.himanshu.inkeep.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.himanshu.inkeep.dto.LoginRequest;
import org.himanshu.inkeep.dto.SignupRequest;
import org.himanshu.inkeep.model.User;
import org.himanshu.inkeep.repository.UserRepository;
import org.himanshu.inkeep.service.OtpEmailService;
import org.himanshu.inkeep.service.OtpSaveService;
import org.himanshu.inkeep.service.UserService;
import org.himanshu.inkeep.util.OtpUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
        private OtpEmailService otpEmailService;

        @Autowired
        private OtpSaveService otpSaveService;

        // ================= Signup =================
        @PostMapping("/signup")
        public ResponseEntity<?> signup(@RequestBody SignupRequest request) {
            String result = userService.registerUser(request);
            if (result.contains("already")) {
                return ResponseEntity.badRequest().body(Map.of("error", result));
            }
            return ResponseEntity.ok(Map.of("message", result));
        }

        // ================= Send OTP =================
        @PostMapping("/send-otp")
        public ResponseEntity<?> sendOtp(@RequestBody Map<String, String> body) {
            String email = body.get("email");

            if (!userRepository.existsByEmail(email)) {
                return ResponseEntity.badRequest().body(Map.of("error", "User not found"));
            }

            String otp = OtpUtil.generateOtp();
        otpSaveService.saveOtp(email, otp);

        try {
            otpEmailService.sendOtpEmail(email, otp);
            return ResponseEntity.ok(Map.of("message", "OTP sent to email"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Failed to send OTP: " + e.getMessage()));
        }
    }

    // ================= Verify OTP =================
    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String submittedOtp = body.get("otp");

        String savedOtp = otpSaveService.getOtp(email);
        if (savedOtp == null || !savedOtp.equals(submittedOtp)) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid or expired OTP"));
        }

        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "User not found"));
        }

        user.setVerified(true);
        userRepository.save(user);
        otpSaveService.deleteOtp(email);

        return ResponseEntity.ok(Map.of("message", "Email verified successfully"));
    }

    // ================= Login =================
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request,
                                   HttpServletRequest servletRequest,
                                   HttpServletResponse response) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );

            Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());
            if (optionalUser.isPresent()) {
                User user = optionalUser.get();
                if (!user.isVerified()) {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                            .body("Email verification required");
                }
            }

            SecurityContextHolder.getContext().setAuthentication(authentication);
            servletRequest.getSession(true).setAttribute(
                    HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY,
                    SecurityContextHolder.getContext()
            );

            return ResponseEntity.ok("Login successful");

        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid credentials");
        }
    }

    // ================= Logout =================
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        request.getSession(false).invalidate();
        SecurityContextHolder.clearContext();

        ResponseCookie cookie = ResponseCookie.from("JSESSIONID", "")
                .path("/")
                .httpOnly(true)
                .maxAge(0)
                .build();
        response.setHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.ok("Logged out successfully");
    }
}
