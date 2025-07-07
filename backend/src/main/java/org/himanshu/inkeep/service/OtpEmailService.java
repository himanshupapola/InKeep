package org.himanshu.inkeep.service;

import brevo.ApiClient;
import brevo.ApiException;
import brevo.Configuration;
import brevo.auth.ApiKeyAuth;
import brevoApi.TransactionalEmailsApi;
import brevoModel.SendSmtpEmail;
import brevoModel.SendSmtpEmailSender;
import brevoModel.SendSmtpEmailTo;
import org.himanshu.inkeep.config.BrevoConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class OtpEmailService {

    @Autowired
    private BrevoConfig brevoConfig;

    public void sendOtpEmail(String toEmail, String otpCode) {
        ApiClient client = Configuration.getDefaultApiClient();
        ApiKeyAuth apiKeyAuth = (ApiKeyAuth) client.getAuthentication("api-key");
        apiKeyAuth.setApiKey(brevoConfig.getApiKey());

        TransactionalEmailsApi emailsApi = new TransactionalEmailsApi(client);

        SendSmtpEmail email = new SendSmtpEmail()
                .sender(new SendSmtpEmailSender()
                        .name(brevoConfig.getSenderName())
                        .email(brevoConfig.getSenderEmail()))
                .to(Collections.singletonList(new SendSmtpEmailTo().email(toEmail)))
                .subject("🔐 Welcome to InKeep - Verify Your Account")
                .htmlContent(generateOtpEmailTemplate(otpCode));

        try {
            emailsApi.sendTransacEmail(email);
            System.out.println("✅ Welcome email sent to " + toEmail);
            System.out.println("🔐 OTP sent: " + otpCode);
        } catch (ApiException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to send OTP email: " + e.getResponseBody(), e);
        }
    }

    private String generateOtpEmailTemplate(String otpCode) {
        return String.format("""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Verify Your InKeep Account</title>
    </head>
    <body style="font-family: 'Segoe UI', sans-serif; background-color: #f9fafb; margin: 0; padding: 0;">
        <div style="max-width: 600px; margin: 40px auto; padding: 30px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
            <h2 style="text-align: center; color: #2d3748;">Welcome to <span style="color: #4f46e5;">InKeep</span> 🎉</h2>
            
            <p style="font-size: 16px; color: #4a5568; line-height: 1.6;">
                Thank you for signing up with InKeep. To complete your account verification and secure your account, please use the One-Time Password (OTP) below:
            </p>
            
            <div style="margin: 30px 0; padding: 20px; background-color: #f0f4ff; border-radius: 8px; text-align: center;">
                <div style="font-size: 16px; color: #1a202c; margin-bottom: 8px;">Your Verification Code</div>
                <div style="font-size: 28px; font-weight: bold; color: #2b6cb0; letter-spacing: 4px; user-select: all; cursor: pointer;">%s</div>
                <div style="font-size: 14px; color: #718096; margin-top: 8px;">⏰ This code expires in 10 minutes</div>
            </div>
            
            <div style="margin-top: 30px;">
                <h3 style="font-size: 18px; color: #2d3748;">🛡️ Security Notice</h3>
                <p style="font-size: 14px; color: #4a5568;">
                    If you didn’t request this code, please ignore this email. Your account remains secure. 
                    <strong>Never share your OTP</strong> with anyone — InKeep will never ask for your verification code via phone or email.
                </p>
            </div>

            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e2e8f0;">

            <div style="font-size: 14px; color: #4a5568; text-align: center;">
                <p><strong>Need help?</strong> Contact our support team</p>
                <p>Email: <a href="mailto:himanshupapola.ph@gmail.com" style="color: #4f46e5;">himanshupapola.ph@gmail.com</a></p>
                <p style="margin-top: 20px; font-size: 12px; color: #a0aec0;">
                    © 2025 InKeep. All rights reserved.<br>
                    This email was sent to verify your account registration.
                </p>
            </div>
        </div>
    </body>
    </html>
    """, otpCode);
    }

}