//package com.fred.docent.service;
//
//import java.util.List;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Primary;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import com.fred.docent.domain.AuthDTO;
//import com.fred.docent.domain.UserDTO;
//import com.fred.docent.mapper.UserMapper;
//
//import lombok.AllArgsConstructor;
//
//@Primary
//@Service("userServiceImpl")
//@AllArgsConstructor
//public class UserServiceImpl implements UserService {
//	private static Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
//
//	@Autowired
//	private UserMapper mapper;
//
//	@Override
//	public AuthDTO login(UserDTO userDTO) {
//		return mapper.login(userDTO.getEmail());
//	}
//
//	@Transactional
//	@Override
//	public void insert(UserDTO userDTO) throws Exception {
//		mapper.insert(userDTO);
//		List<AuthDTO> authList = userDTO.getAuthList();
//		
//		for (AuthDTO memberAuth : authList) {
//			if(memberAuth.getAuthority().trim().length() ==0 || (memberAuth.getAuthority() == null)) {
//				continue;
//			}
//			memberAuth.setEmail(userDTO.getEmail());
//			mapper.insertAuth(memberAuth);
//		}
//	}
//
//	@Override
//	public boolean dupId(String userid) {
//		return mapper.dupId(userid)==0 ? true:false;
//	}
//
//	@Transactional
//	@Override
//	public void delete(UserDTO userDTO) {
//		mapper.delete(userDTO.getEmail());
//	}
//
//	@Transactional
//	@Override
//	public boolean update(UserDTO userDTO) {
//		return mapper.updatePwd(userDTO)==1 ? true:false;
//	}
//
//}
