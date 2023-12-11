package com.fred.docent.domain;

import java.util.Collection;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

public class CustomUser extends User {
	
	private UserDTO userDTO;

	public CustomUser(String username, String password, Collection<? extends GrantedAuthority> authorities) {
		super(username, password, authorities);
	}

	public CustomUser(UserDTO userDTO) {
		super(userDTO.getEmail(), userDTO.getPassword(), userDTO.getAuthorities()
																	 .stream() // List 형태(getAuthorities())를 스트림으로 변환해주는 과정
																	 .map(auth -> new SimpleGrantedAuthority(auth.getAuth()))
																	 .collect(Collectors.toList()));
		this.userDTO = userDTO;
	}

}
