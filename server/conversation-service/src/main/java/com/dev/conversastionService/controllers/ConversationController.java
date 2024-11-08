package com.dev.conversastionService.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;

import com.dev.conversastionService.dto.ChatDto;
import com.dev.conversastionService.dto.UserDto;
import com.dev.conversastionService.model.Conversation;
import com.dev.conversastionService.services.ConversationService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ConversationController {
	
	@Autowired
	private ConversationService conversationService;
	
	private final SimpMessagingTemplate messagingTemplate;

    public ConversationController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }
	
	private UserDto getUser() {
		return (UserDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	}

    @MessageMapping("/messages")
    public void sendMessage(@Payload ChatDto chatDto) {
    	
    	String status = conversationService.sendMessage(getUser(), chatDto);
    	
    	if(status.equals("Success")) {
    		messagingTemplate.convertAndSendToUser(
    	            chatDto.getReceiverId(),
    	            "/messages",
    	            chatDto                  
    	        );
    		messagingTemplate.convertAndSendToUser(
    	            chatDto.getSenderId(),
    	            "/messages",
    	            "Sent message successfully"                  
    	        );
    	}
    	else {
    		messagingTemplate.convertAndSendToUser(
    	            chatDto.getSenderId(),
    	            "/messages",
    	            "Error occurred, message should be sent only to friends!"                  
    	        );
    	}
    	
	}
    
    @RequestMapping(path = "/conversations", method = RequestMethod.GET)
    public List<Conversation> getConversations(){
    	return conversationService.getConversations(getUser());
    }

}

