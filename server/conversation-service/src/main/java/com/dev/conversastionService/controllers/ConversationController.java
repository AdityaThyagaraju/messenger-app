package com.dev.conversastionService.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;

import com.dev.conversastionService.dto.ChatDto;
import com.dev.conversastionService.dto.UserDto;
import com.dev.conversastionService.model.Conversation;
import com.dev.conversastionService.model.UserPrincipal;
import com.dev.conversastionService.services.ConversationService;
import com.dev.conversastionService.services.UserOnlineService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ConversationController {
	
	@Autowired
	private ConversationService conversationService;
	
	private final SimpMessagingTemplate messagingTemplate;
	
	private final Map<String, Set<String>> userSessions = new ConcurrentHashMap();

    public ConversationController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }
	
    private UserDto getUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication == null)
        	return null;
        return ((UserPrincipal) authentication.getPrincipal()).getUser();
    }

    @MessageMapping("/send.message")
    public void sendMessage(@Payload ChatDto chatDto) {
    	
    	UserDto user = getUser();
    	
    	if(!user.getId().equals(chatDto.getSenderId())) {
    		messagingTemplate.convertAndSendToUser(
    				user.getId(), 
    				"/queue/messages", 
    				"Cannot send message, invalid token for given senderId!");
    	}
    	
    	String status = conversationService.sendMessage(user, chatDto);
    	
    	if(status.equals("Success")) {
    		messagingTemplate.convertAndSendToUser(
    	            chatDto.getReceiverId(),
    	            "/queue/messages",
    	            chatDto                  
    	        );
    		messagingTemplate.convertAndSendToUser(
    	            chatDto.getSenderId(),
    	            "/queue/messages",
    	            chatDto                  
    	        );
    	}
    	else {
    		messagingTemplate.convertAndSendToUser(
    	            chatDto.getSenderId(),
    	            "/queue/messages",
    	            "Error occurred, message should be sent only to friends!"                  
    	        );
    	}
    	
	}
    
    @RequestMapping(path = "/conversations", method = RequestMethod.GET)
    public List<Conversation> getConversations(){
    	return conversationService.getConversations(getUser());
    }

}

