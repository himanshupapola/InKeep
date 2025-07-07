package org.himanshu.inkeep.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class SessionController {

    @GetMapping("/isLoggedIn")
    public ResponseEntity<?> isLoggedIn() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth != null && auth.isAuthenticated() && !(auth instanceof AnonymousAuthenticationToken)) {
            return ResponseEntity.ok("Logged in as: " + auth.getName());
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not logged in");
    }


}
