package com.fred.docent.handler;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

public class CustomLoginSuccessHandler implements AuthenticationSuccessHandler {
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		
		List<String> roleNames=new ArrayList<String>();
		// 로그인 사용자의 권한 확인
		authentication.getAuthorities().forEach(auth -> roleNames.add(auth.getAuthority()));
		
		if(roleNames.contains("ROLE_ADMIN")) {
			response.sendRedirect("/");
			return;
		}
		
		if(roleNames.contains("ROLE_USER") || roleNames.contains("ROLE_AUTHOR")) {
			response.sendRedirect("/");
			return;
		}		
		
		response.sendRedirect("/");
		
	}

}
