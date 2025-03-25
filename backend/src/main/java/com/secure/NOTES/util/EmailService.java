package com.secure.NOTES.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

//@Service
//public class EmailService {
//
//    @Autowired
//    private JavaMailSender mailSender;
//
//    public void sendPasswordResetEmail(String to , String resetUrl){
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setTo(to);
//        message.setSubject("Password Reset Request from SecureNotes");
//        message.setText("Click the link to reset your password:"+ resetUrl);
//        mailSender.send(message);
//    }
//}

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendPasswordResetEmail(String to, String resetUrl) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject("Password Reset Request from SecureNotes");
            message.setText("Click the link to reset your password: " + resetUrl);

            mailSender.send(message);
            logger.info("✅ Email sent successfully to: {}", to);
        } catch (MailException e) {
            logger.error("❌ Error sending email to {}: {}", to, e.getMessage());
        }
    }
}

