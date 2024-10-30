package com.dev.authServices.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.dev.authServices.model.User;


@Service
public class UserValidateService {
	
	@Autowired
	private AuthenticationManager authManager;
	
	@Autowired
	private JwtService jwtService;
	
	public String generateToken(User user) {
		return jwtService.generateToken(user.getUsername());
	}
	
	public String verifyCredentials(User user) {
		Authentication authentication = authManager.authenticate(
				new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
		if(authentication.isAuthenticated())
			return generateToken(user);
		return null;
	}

}
