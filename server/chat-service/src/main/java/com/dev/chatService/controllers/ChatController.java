package com.dev.chatService.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.dev.chatService.dto.UserDto;
import com.dev.chatService.model.Chat;
import com.dev.chatService.model.UserPrincipal;
import com.dev.chatService.services.ChatService;

@RestController
@RequestMapping(path = "/chats")
@CrossOrigin(origins = "*")
public class ChatController {
	
	@Autowired
	private ChatService chatService;
	
	private UserDto getUser() {
		return ((UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUser();
	}
	
	@RequestMapping(path = "/{id}", method =  RequestMethod.GET)
	public ResponseEntity<Chat> getChat(@PathVariable String id) {
		return new ResponseEntity<Chat>(chatService.getChat(id, getUser()), HttpStatusCode.valueOf(200));
	}
	
	@RequestMapping(path = "", method =  RequestMethod.POST)
	public ResponseEntity<String> addChat(@RequestBody Chat chat) {
		Chat savedChat = chatService.saveChat(chat, getUser());
		if(savedChat == null)
			return new ResponseEntity<String>("Invalid Chat", HttpStatusCode.valueOf(400));
		return new ResponseEntity<String>(savedChat.getId(), HttpStatusCode.valueOf(200));
	}

}
