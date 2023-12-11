package com.fred.docent.controller;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

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
import org.springframework.web.bind.annotation.RequestParam;
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

	// 회원가입
	@PostMapping("/insert")
	public ResponseEntity<String> insert(@RequestBody UserDTO dto) throws Exception {
		log.info("insert member " + dto.toString());

		String email = dto.getEmail();

		// 중복이메일 검사
		if (!service.dupId(email)) {
			Map<String, String> response = new HashMap<>();
			response.put("errorCode", "email");
			response.put("errorMessage", "이미 존재하는 이메일입니다.");
			ObjectMapper objectMapper = new ObjectMapper();
			String json = objectMapper.writeValueAsString(response);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_UTF8_VALUE).body(json);
		}

		service.insert(dto);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@GetMapping("/{email}")
    public ResponseEntity<Object> dupIdCheck(@PathVariable String email) {
        boolean idCheck = service.dupId(email);
        
        if (idCheck) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(false);
        }
    }

	@GetMapping("/mailCheck/{email:.+}")
	@ResponseBody
	public String mailCheck(@PathVariable String email) {
		System.out.println("이메일 인증 요청이 들어옴!");
		System.out.println("이메일 인증 이메일 : " + email);
		return mailService.joinEmail(email);
	}

	// 회원정보 수정(비밀번호)
	@PostMapping("/update")
	public ResponseEntity<String> change(@RequestBody PasswordChangeDTO passwordChangeDTO) throws Exception {
	    log.info("change request ");
	    log.info("oldPassword: " + passwordChangeDTO.getOldPassword() + ", newPassword: " + passwordChangeDTO.getNewPassword());

	    String email = passwordChangeDTO.getEmail();  // JSON 데이터에서 email 값을 가져옵니다.
	    UserDTO dto = service.readUserByEmail(email);

	    if(dto != null && encoder.matches(passwordChangeDTO.getOldPassword(), dto.getPassword())) {
	        String encryptedPassword = encoder.encode(passwordChangeDTO.getNewPassword());
	        dto.setPassword(encryptedPassword);
	        service.update(dto);
	        return ResponseEntity.status(HttpStatus.OK).body("{\"message\": \"Success\"}");
	    }

	    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"message\": \"Failed\"}");
	}



	// 회원탈퇴
	@PostMapping("/delete")
	public ResponseEntity<Object> delete(@RequestBody UserDTO dto) {
	    if (dto.getEmail() != null && encoder.matches(dto.getPassword(), service.readUserByEmail(dto.getEmail()).getPassword())) {
	        service.delete(dto);
	        return ResponseEntity.ok().body("{\"message\": \"Success\"}");
	    }

	    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"message\": \"Failed\"}");
	}


	// 로그인
	@PostMapping("/login")
	public ResponseEntity<Map<String, Object>> login(@RequestBody LoginDTO loginDTO, HttpSession session) {
	    log.info("로그인 요청 " + loginDTO);

	    // 입력받은 이메일과 비밀번호로 DB에서 사용자 정보를 가져옵니다.
	    UserDTO userDTO = service.readUserByEmail(loginDTO.getEmail());

	    Map<String, Object> response = new HashMap<>();
	    if (userDTO != null && encoder.matches(loginDTO.getPassword(), userDTO.getPassword())) {
	        // 이메일과 비밀번호가 일치하는 경우, 로그인 성공 처리를 합니다.
	        session.setAttribute("userDTO", userDTO);

	        // 로그인 성공 시 사용자의 권한 정보를 함께 응답 본문에 포함시킵니다.
	        response.put("message", "Success");
	        response.put("authorities", userDTO.getAuthorities()); // 사용자의 권한 정보
	        response.put("username", userDTO.getUsername()); // 사용자의 username

	        return ResponseEntity.ok(response);
	    } else {
	        // 이메일과 비밀번호가 일치하지 않는 경우, 로그인 실패 처리를 합니다.
	        response.put("message", "Failed");
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
	    }
	}


	// 로그인 에러
	@GetMapping("/login-error")
	public ResponseEntity<String> loginError() {
		String errorMessage = "아이디나 비밀번호를 확인해주세요.";
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"error\": \"" + errorMessage + "\"}");
	}
	
	// 로그아웃
	@GetMapping(value = "/logout", produces = "application/json;charset=UTF-8")
	public ResponseEntity<String> logout(HttpSession session) {
		session.removeAttribute("email");
		String message = "로그아웃 요청";
		return new ResponseEntity<>(message, HttpStatus.OK);
	}
	
	// 시큐리티 접근 관련
	@GetMapping("/access-denied")
	public ResponseEntity<String> accessDenied() {
		String errorMessage = "Access denied. You do not have permission to access this page.";
		return new ResponseEntity<>(errorMessage, HttpStatus.FORBIDDEN);
	}

	// 비밀번호 찾기
	@PostMapping(value = "/findPassword", produces = "application/json;charset=UTF-8")
	public ResponseEntity<Map<String, Object>> findPassword(@RequestBody UserDTO dto) {
		String email = dto.getEmail();
		String username = dto.getUsername();

		// 입력한 정보와 일치하는 사용자를 조회합니다.
		UserDTO user = service.checkUser(username, email);

		Map<String, Object> response = new HashMap<>();
		if (user != null) {
			// 정보가 일치하면 변경 폼으로 이동합니다.
			response.put("message", "success");
			response.put("user", user);
			return new ResponseEntity<>(response, HttpStatus.OK);
		} else {
			// 사용자가 없는 경우 알림을 출력하고 findPassword 페이지를 다시 보여줍니다.
			response.put("error", "회원 정보를 확인해주세요.");
			return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
		}
	}

	// 비밀번호 수정 마이페이지

}
