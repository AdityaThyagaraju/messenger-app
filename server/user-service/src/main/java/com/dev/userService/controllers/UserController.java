package com.dev.userService.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.dev.userService.dto.UserDto;
import com.dev.userService.model.User;
import com.dev.userService.model.UserPrincipal;
import com.dev.userService.repositrories.UserRepository;
import com.dev.userService.services.JwtService;
import com.dev.userService.services.UserService;
import com.dev.userService.services.UserValidateService;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "/user")
public class UserController {
	
	@Autowired
	JwtService jwtService;
	
	@Autowired
	private UserValidateService userValidateService;
	
	@Autowired
	private UserService userService;
	
	private User getUserFromToken() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserPrincipal userDetails = (UserPrincipal) authentication.getPrincipal();
        return userDetails.getUser();
	}
	
	@RequestMapping(path="/login", method=RequestMethod.POST)
    public ResponseEntity<String> login(@RequestBody User user){
    	String status = userValidateService.verifyCredentials(user);
    	
    	if(status == null)
    		return new ResponseEntity<String>("failed", HttpStatusCode.valueOf(200));
    	return new ResponseEntity<String>(userValidateService.generateToken(user), HttpStatusCode.valueOf(200));
    }
	
	@RequestMapping(path="/register", method=RequestMethod.POST)
    public ResponseEntity<String> register(@RequestBody User user){
		userService.saveUser(user);
    	return new ResponseEntity<String>(userValidateService.generateToken(user), HttpStatusCode.valueOf(200));
    }
	
	@RequestMapping(path="/extract-user", method=RequestMethod.GET)
    public ResponseEntity<UserDto> extractUser(){
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserPrincipal userDetails = (UserPrincipal) authentication.getPrincipal();
    	
        User user = userDetails.getUser();
    	return new ResponseEntity<UserDto>(new UserDto(user, jwtService.generateToken(user.getUsername())), HttpStatusCode.valueOf(200));
    }
	
	@RequestMapping(path="/friend/{id}", method=RequestMethod.GET)
    public ResponseEntity<UserDto> getFriend(@PathVariable String id){
		User user = getUserFromToken();
        
        if(user.getFriendIds()==null || !user.getFriendIds().contains(id)) {
        	return new ResponseEntity<UserDto>(new UserDto(new User(), ""), HttpStatusCode.valueOf(200));
        }
    	
    	return new ResponseEntity<UserDto>(new UserDto(userService.getUserById(id), userValidateService.generateToken(user)), HttpStatusCode.valueOf(200));
    }
	
	@RequestMapping(path="/accept-friend-request", method=RequestMethod.POST)
    public ResponseEntity<String> acceptFriend(@RequestParam(name = "friendId") String id){
		User user = getUserFromToken();
		return new ResponseEntity<String>(userService.acceptFriendRequest(user.getId(), id), HttpStatusCode.valueOf(200));
    }
	
	@RequestMapping(path="/send-friend-request", method=RequestMethod.POST)
    public ResponseEntity<String> sendFriendRequest(@RequestParam(name = "friendId") String id){
		User user = getUserFromToken();
        userService.sendFriendRequest(user.getId(), id);
        return new ResponseEntity<String>("Success", HttpStatusCode.valueOf(200));
    }
}
