package com.fred.docent.domain;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class LoginDTO {
	private String email;
	private String password;
	private String sessionId;

}
