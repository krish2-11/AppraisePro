package com.example.demo.Service;

import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String to, String subject, String name, String loginUrl) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            // Load HTML Email Template
            String htmlContent = getHtmlTemplate(name, loginUrl);

            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlContent, true); // Enable HTML format

            mailSender.send(message);
            System.out.println("Email sent successfully to: " + to);

        } catch (Exception e) {
            System.out.println("Error while sending email: " + e.getMessage());
        }
    }

    private String getHtmlTemplate(String name, String loginUrl) {
        return "<!DOCTYPE html>" +
                "<html>" +
                "<head>" +
                "<meta charset='UTF-8'>" +
                "<title>Welcome Email</title>" +
                "<style>" +
                "body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }" +
                ".container { width: 80%; max-width: 600px; background-color: #ffffff; margin: 20px auto; padding: 20px; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); }" +
                ".header { text-align: center; background-color: #007bff; color: white; padding: 15px; font-size: 24px; font-weight: bold; border-top-left-radius: 8px; border-top-right-radius: 8px; }" +
                ".content { padding: 20px; font-size: 16px; line-height: 1.6; color: #333; }" +
                ".footer { text-align: center; padding: 10px; font-size: 14px; color: #777; }" +
                ".button { display: inline-block; padding: 10px 20px; margin: 20px 0; background-color: #007bff; color: white; text-decoration: none; font-size: 16px; border-radius: 5px; }" +
                ".button:hover { background-color: #0056b3; }" +
                "</style>" +
                "</head>" +
                "<body>" +
                "<div class='container'>" +
                "<div class='header'>Welcome to Our Platform!</div>" +
                "<div class='content'>" +
                "<p>Dear <strong>" + name + "</strong>,</p>" +
                "<p>Welcome to our platform! We are excited to have you onboard.</p>" +
                "<p>You can log in using your registered email by clicking the button below:</p>" +
                "<p style='text-align: center;'>" +
                "<a href='" + loginUrl + "' class='button'>Login Now</a>" +
                "</p>" +
                "<p>If you have any questions, feel free to reach out to us.</p>" +
                "<p>Best Regards,</p>" +
                "<p><strong>Team</strong></p>" +
                "</div>" +
                "<div class='footer'>&copy; 2025 Your Company. All rights reserved.</div>" +
                "</div>" +
                "</body>" +
                "</html>";
    }
}
