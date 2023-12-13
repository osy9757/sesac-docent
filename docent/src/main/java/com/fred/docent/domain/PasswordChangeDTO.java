package com.fred.docent.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter @ToString
public class PasswordChangeDTO {
	private String email;
	private String oldPassword;
    private String newPassword;
}
