package com.fred.docent.domain;

import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
	private int userid;
	private String email;
	private String password;
	private String username;
	private Date createdat;
	private String authority;

	private List<AuthDTO> authorities;

	private String authCode; // ������ȣ�� ������ �ʵ�

}
