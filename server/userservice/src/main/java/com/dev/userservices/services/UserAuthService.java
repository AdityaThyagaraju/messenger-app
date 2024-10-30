package com.dev.userservices.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.dev.userservices.model.User;
import com.dev.userservices.model.UserPrincipal;

@Service
public class UserAuthService implements UserDetailsService{
	
	@Autowired
	UserService userService;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		return new UserPrincipal(userService.getUserByUsername(username));
	}

}
