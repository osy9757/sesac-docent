package com.fred.docent.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fred.docent.domain.UserDTO;
import com.fred.docent.mapper.UserMapper;

@Service("UserService")
@Primary
@Transactional
public class UserService {

	private UserMapper mapper;
	private BCryptPasswordEncoder encoder;

	@Autowired
	public UserService(UserMapper mapper, BCryptPasswordEncoder encoder) {
		this.mapper = mapper;
		this.encoder = encoder;
	}

	public boolean insert(UserDTO userDTO) throws Exception {
		userDTO.setPassword(encoder.encode(userDTO.getPassword()));

		boolean flag = mapper.insert(userDTO) == 1;
		return flag;
	}

	public boolean dupId(String email) {
		return mapper.dupId(email) == 0 ? true : false;
	}

	public void delete(UserDTO userDTO) {
		mapper.delete(userDTO.getEmail());
	}

	public void update(UserDTO userDTO) throws Exception {
		mapper.update(userDTO);
	}

	public UserDTO readUserByEmail(String email) {
		return mapper.readUserByEmail(email);
	};

	public UserDTO readNameByEmail(String email) {
		return mapper.readNameByEmail(email);
	};

	public UserDTO checkUser(String username, String email) {
		UserDTO user = mapper.checkUser(username, email);
		return user;
	}

}
