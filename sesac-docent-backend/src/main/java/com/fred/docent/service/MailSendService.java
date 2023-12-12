package com.fred.docent.service;

import java.util.Random;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.fred.docent.domain.UserDTO;

@Component
@Service
public class MailSendService {
	private final JavaMailSender mailSender;
	private Integer authNumber;
	private Integer newPassword;

	@Autowired
	private UserService service;

	@Autowired
	public BCryptPasswordEncoder encoder;

	@Autowired
	public MailSendService(JavaMailSender mailSender, Integer authNumber, Integer newPassword) {
		this.mailSender = mailSender;
		this.authNumber = authNumber;
		this.newPassword = newPassword;
	}

	public void makeRandomNumber() {
		Random r = new Random();
		int checkNum = r.nextInt(900000) + 100000;
		System.out.println("verification code : " + checkNum);
		authNumber = checkNum;
	}

	public void makeRandomPassword() {
		Random r = new Random();
		int checkNum2 = r.nextInt(900000000) + 100000000;
		System.out.println("verification code : " + checkNum2);
		newPassword = checkNum2;
	}

	public String joinEmail(String email) {
		makeRandomNumber();
		String setFrom = "hsuyeon607@gmail.com";
		String toMail = email;
		String title = "This is email for register verification.";
		String content = "Welcome to visit our homepage." + "<br><br>" + "verification code: " + authNumber + "<br>"
				+ "Please enter the verification code in the verification code field.";
		mailSend(setFrom, toMail, title, content);
		return Integer.toString(authNumber);
	}

	public String findPassword(String email) throws Exception {
		makeRandomPassword();
		String setFrom = "hsuyeon607@gmail.com";
		String toMail = email;
		String title = "This is email for register verification.";
		String content = "Welcome to visit our homepage." + "<br><br>" + "verification code: " + newPassword + "<br>"
				+ "Please enter the verification code in the verification code field.";
		mailSend(setFrom, toMail, title, content);

		String encryptedPassword = encoder.encode(Integer.toString(newPassword));
		UserDTO userDTO = new UserDTO();
		userDTO.setEmail(email);
		userDTO.setPassword(encryptedPassword);
		service.update(userDTO);

		return Integer.toString(newPassword);
	}

	public void mailSend(String setFrom, String toMail, String title, String content) {
		MimeMessage message = mailSender.createMimeMessage();

		try {
			MimeMessageHelper helper = new MimeMessageHelper(message, true, "utf-8");
			helper.setFrom(setFrom);
			helper.setTo(toMail);
			helper.setSubject(title);
			helper.setText(content, true);
			mailSender.send(message);
		} catch (MessagingException e) {
			e.printStackTrace();
		}
	}

}