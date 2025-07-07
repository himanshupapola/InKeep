package org.himanshu.inkeep.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
@Getter
public class BrevoConfig {

    @Value("${brevo.api-key}")
    private String apiKey;

    @Value("${brevo.sender-name}")
    private String senderName;

    @Value("${brevo.sender-email}")
    private String senderEmail;
}