package org.himanshu.inkeep.dto;

import lombok.Data;

@Data
public class UpdateProfileRequest {
    private String name;
    private String city;
    private String dob;
    private String gender;
    private String profileImage;
}
