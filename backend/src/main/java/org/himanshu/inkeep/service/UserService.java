package org.himanshu.inkeep.service;

import org.himanshu.inkeep.dto.LoginRequest;
import org.himanshu.inkeep.dto.SignupRequest;
import org.himanshu.inkeep.model.User;
import org.himanshu.inkeep.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public String registerUser(SignupRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return "Email already in use";
        }

        LocalDate dob = LocalDate.parse(request.getDob());

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .city(request.getCity())    
                .gender(request.getGender())
                .dob(dob)
                .profileImage("https://res.cloudinary.com/ddu1cyhxh/image/upload/v1742328494/diary/profile/64623264-3939-5437-a362-323530623764_1742328491107.png")
                .isVerified(false)
                .build();

        userRepository.save(user);
        return "Now Please Login and verify your email";
    }



}
