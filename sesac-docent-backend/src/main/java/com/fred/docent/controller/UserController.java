package com.fred.docent.controller;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.log;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fred.docent.domain.LoginDTO;
import com.fred.docent.domain.PasswordChangeDTO;
import com.fred.docent.domain.UserDTO;
import com.fred.docent.service.MailSendService;
import com.fred.docent.service.UserService;

import lombok.extern.log4j.Log4j;

@Log4j
@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserService service;

	@Autowired
	private MailSendService mailService;

	@Autowired
	public BCryptPasswordEncoder encoder;

	@PostMapping("/insert")
	public ResponseEntity<String> insert(@RequestBody UserDTO dto) throws Exception {
		log.info("insert member " + dto.toString());

		service.insert(dto);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@GetMapping("/{email:.+}")
	public ResponseEntity<Map<String, Object>> dupIdCheck(@PathVariable String email) {
		log.info(email);
		boolean idCheck = service.dupId(email);
		Map<String, Object> response = new HashMap<>();

		if (idCheck) {
			log.info("unique");
			response.put("isUnique", true);
			String authNumber = mailService.joinEmail(email);
			response.put("authNumber", authNumber);
			return ResponseEntity.status(HttpStatus.ACCEPTED)
					.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_UTF8_VALUE).body(response);
		} else {
			log.info("not unique");
			response.put("isUnique", false);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_UTF8_VALUE).body(response);
		}
	}

	@PostMapping("/update")
	public ResponseEntity<String> change(@RequestBody PasswordChangeDTO passwordChangeDTO) throws Exception {
		log.info("change request ");
		log.info("oldPassword: " + passwordChangeDTO.getOldPassword() + ", newPassword: "
				+ passwordChangeDTO.getNewPassword());

		String email = passwordChangeDTO.getEmail();
		UserDTO dto = service.readUserByEmail(email);

		if (dto != null && encoder.matches(passwordChangeDTO.getOldPassword(), dto.getPassword())) {
			String encryptedPassword = encoder.encode(passwordChangeDTO.getNewPassword());
			dto.setPassword(encryptedPassword);
			service.update(dto);
			return ResponseEntity.status(HttpStatus.OK).body("{\"message\": \"Success\"}");
		}

		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"message\": \"Failed\"}");
	}

	@PostMapping("/delete")
	public ResponseEntity<Object> delete(@RequestBody UserDTO dto) {
		if (dto.getEmail() != null
				&& encoder.matches(dto.getPassword(), service.readUserByEmail(dto.getEmail()).getPassword())) {
			service.delete(dto);
			return ResponseEntity.ok().body("{\"message\": \"Success\"}");
		}

		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"message\": \"Failed\"}");
	}

	@PostMapping("/login")
	public ResponseEntity<Map<String, Object>> login(@RequestBody LoginDTO loginDTO, HttpServletRequest request,
			HttpServletResponse response) {

		log.info("login request " + loginDTO);

		UserDTO userDTO = service.readUserByEmail(loginDTO.getEmail());

		Map<String, Object> responseBody = new HashMap<>();

		if (userDTO != null && encoder.matches(loginDTO.getPassword(), userDTO.getPassword())) {
			HttpSession session = request.getSession();
			session.setAttribute("userDTO", userDTO);
			String sessionId = session.getId();

			Cookie cookie = new Cookie("JSESSIONID", sessionId);
			cookie.setPath("/");
			cookie.setHttpOnly(true);
			response.addCookie(cookie);

			session.setAttribute("userDTO", userDTO);
			String newSessionId = session.getId();

			responseBody.put("sessionId", newSessionId);
			responseBody.put("message", "Success");
			responseBody.put("authority", userDTO.getAuthority());
			responseBody.put("username", userDTO.getUsername());
			log.info(responseBody);
			
			return ResponseEntity.ok(responseBody);
		} else {
			responseBody.put("message", "Failed");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
		}
	}

	
	@GetMapping("/loginBySessionId")
	public ResponseEntity<Map<String, Object>> loginBySessionId(HttpServletRequest request) {
		HttpSession session = request.getSession(false);

		Map<String, Object> response = new HashMap<>();

		if (session != null) {
			String sessionIdFromCookie = Arrays.stream(request.getCookies())
					.filter(cookie -> "JSESSIONID".equals(cookie.getName())).map(Cookie::getValue).findFirst()
					.orElse(null);

			if (sessionIdFromCookie != null && sessionIdFromCookie.equals(session.getId())) {
				UserDTO userDTO = (UserDTO) session.getAttribute("userDTO");

				if (userDTO != null) {
					response.put("sessionId", sessionIdFromCookie);
					response.put("message", "Success");
					response.put("authority", userDTO.getAuthority());
					response.put("username", userDTO.getUsername());
					response.put("email", userDTO.getEmail());
					log.info(response);
					return ResponseEntity.ok(response);
				}
			}
		}

		response.put("message", "Failed");
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
	}

	@GetMapping("/logout")
	public ResponseEntity<Map<String, Object>> logout(HttpServletRequest request) {
		HttpSession session = request.getSession(false);
		log.info("logout requested");

		Map<String, Object> response = new HashMap<>();

		if (session != null) {
			session.invalidate();
			response.put("message", "Logout Success");
			log.info("logout success");
			return ResponseEntity.ok(response);
		} else {
			response.put("message", "Logout Failed");
			return ResponseEntity.ok(response);
		}
	}

	@GetMapping("/login-error")
	public ResponseEntity<String> loginError() {
		String errorMessage = "Please check your email or password.";
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"error\": \"" + errorMessage + "\"}");
	}

//	@GetMapping("/access-denied")
//	public ResponseEntity<String> accessDenied() {
//		String errorMessage = "Access denied. You do not have permission to access this page.";
//		return new ResponseEntity<>(errorMessage, HttpStatus.FORBIDDEN);
//	}

	@PostMapping(value = "/findPassword", produces = "application/json;charset=UTF-8")
	public ResponseEntity<Map<String, Object>> findPassword(@RequestBody UserDTO dto) throws Exception {
		String email = dto.getEmail();
		String username = dto.getUsername();

		UserDTO user = service.checkUser(username, email);

		Map<String, Object> response = new HashMap<>();
		if (user != null) {
			String newPassword = mailService.findPassword(email);
			response.put("message", "success");
			response.put("user", user);
			response.put("newPassword", newPassword);
			return new ResponseEntity<>(response, HttpStatus.OK);
		} else {
			response.put("error", "Please check user information.");
			return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
		}
	}


}
