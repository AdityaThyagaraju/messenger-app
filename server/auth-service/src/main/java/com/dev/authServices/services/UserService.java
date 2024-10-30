package com.dev.authServices.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.dev.authServices.model.User;
import com.dev.authServices.repositrories.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
	
	public User getUserByUsername(String username) {
		
		Optional<User> user = userRepository.findById(username);
		return user.get();
		
	}
	
	public User saveUser(User user) {
		user.setPassword(encoder.encode(user.getPassword()));
		return userRepository.save(user);
	}

}
