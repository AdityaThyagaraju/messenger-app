package com.dev.authServices.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.dev.authServices.dto.UserDto;
import com.dev.authServices.model.User;
import com.dev.authServices.repositrories.UserRepository;
import com.dev.authServices.services.UserService;
import com.dev.authServices.services.UserValidateService;

@RestController
public class AuthController {
	
	@Autowired
	private UserValidateService userValidateService;
	
	@Autowired
	private UserService userService;
	
	@RequestMapping(path="/login", method=RequestMethod.POST)
    public ResponseEntity<UserDto> login(@RequestBody User user){
    	String status = userValidateService.verifyCredentials(user);
    	
    	if(status == null)
    		return new ResponseEntity<UserDto>(new UserDto(new User(), ""), HttpStatusCode.valueOf(200));
    	
    	User savedUser = userService.getUserByUsername(user.getUsername());
    	UserDto response = new UserDto(savedUser, userValidateService.generateToken(savedUser));
    	return new ResponseEntity<UserDto>(response, HttpStatusCode.valueOf(200));
    }
	
	@RequestMapping(path="/register", method=RequestMethod.POST)
    public ResponseEntity<UserDto> register(@RequestBody User user){
		
    	User savedUser = userService.saveUser(user);
    	UserDto response = new UserDto(savedUser, userValidateService.generateToken(savedUser));
    	
    	return new ResponseEntity<UserDto>(response, HttpStatusCode.valueOf(200));
    }
}
