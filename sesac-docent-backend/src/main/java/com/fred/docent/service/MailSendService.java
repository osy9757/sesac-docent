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
		// 난수의 범위 100000 ~ 999999 (6자리 난수)
		Random r = new Random();
		int checkNum = r.nextInt(900000) + 100000;
		System.out.println("인증번호 : " + checkNum);
		authNumber = checkNum;
	}

	public void makeRandomPassword() {
		// 난수의 범위 100000000 ~ 999999999 (9자리 난수)
		Random r = new Random();
		int checkNum2 = r.nextInt(900000000) + 100000000;
		System.out.println("인증번호 : " + checkNum2);
		newPassword = checkNum2;
	}

	// 이메일 보내는 양식
	public String joinEmail(String email) {
		makeRandomNumber();
		String setFrom = "hsuyeon607@gmail.com";
		String toMail = email;
		String title = "회원 가입 인증 이메일 입니다.";
		String content = "홈페이지를 방문해주셔서 감사합니다." + "<br><br>" + "인증 번호는 " + authNumber + "입니다." + "<br>"
				+ "해당 인증번호를 인증번호 확인란에 기입하여 주세요.";
		mailSend(setFrom, toMail, title, content);
		return Integer.toString(authNumber);
	}

	// 비밀번호 초기화 이메일
	public String findPassword(String email) throws Exception {
		makeRandomPassword();
		String setFrom = "hsuyeon607@gmail.com";
		String toMail = email;
		String title = "새 비밀번호입니다.";
		String content = "홈페이지를 방문해주셔서 감사합니다." + "<br><br>" + "새 비밀번호는 " + authNumber + "입니다." + "<br>"
				+ "해당 비밀번호로 로그인해주세요.";
		mailSend(setFrom, toMail, title, content);

		String encryptedPassword = encoder.encode(Integer.toString(newPassword));
		UserDTO userDTO = new UserDTO();
		userDTO.setEmail(email);
		userDTO.setPassword(encryptedPassword);
		service.update(userDTO);

		return Integer.toString(newPassword);
	}

	// �씠硫붿씪 �쟾�넚 硫붿냼�뱶
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