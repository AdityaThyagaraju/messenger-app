package com.dev.conversastionService.controllers;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.dev.conversastionService.dto.UserDto;
import com.dev.conversastionService.model.UserPrincipal;

@RestController
@RequestMapping("/conversation")
public class ConversationController {
	
	@RequestMapping(path = "", method = RequestMethod.GET)
	public UserDto getConversations() {
		return ((UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUser();
	}

}
