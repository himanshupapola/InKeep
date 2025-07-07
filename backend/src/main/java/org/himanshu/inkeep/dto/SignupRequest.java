package org.himanshu.inkeep.dto;

import lombok.Data;

@Data
public class SignupRequest {
    private String name;
    private String email;
    private String password;
    private String city;
    private String gender;
    private String dob;
}
