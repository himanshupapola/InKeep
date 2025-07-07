package org.himanshu.inkeep.controller;

import org.himanshu.inkeep.dto.UpdateProfileRequest;
import org.himanshu.inkeep.model.User;
import org.himanshu.inkeep.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/getProfile")
    public ResponseEntity<?> getProfile() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null || !auth.isAuthenticated() || auth instanceof AnonymousAuthenticationToken) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                    "loggedIn", false,
                    "message", "User not logged in"
            ));
        }

        String email = auth.getName();
        User user = userRepository.findByEmail(email).orElse(null);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        return ResponseEntity.ok(Map.of(
                "id", user.getId(),
                "name", user.getName(),
                "email", user.getEmail(),
                "dob", user.getDob(),
                "city", user.getCity(),
                "gender", user.getGender(),
                "isVerified", user.isVerified(),
                "profileImage", user.getProfileImage()
        ));
    }

    @PutMapping("/updateProfile")
    public ResponseEntity<?> updateProfile(@RequestBody UpdateProfileRequest request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null || !auth.isAuthenticated() || auth instanceof AnonymousAuthenticationToken) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("❌ Not logged in");
        }

        String email = auth.getName();
        User user = userRepository.findByEmail(email).orElse(null);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        // Update allowed fields
        user.setName(request.getName());
        user.setCity(request.getCity());
        user.setDob(LocalDate.parse(request.getDob()));
        user.setGender(request.getGender());
        user.setProfileImage(request.getProfileImage());

        userRepository.save(user);

        return ResponseEntity.ok("✅ Profile updated successfully");
    }


}
