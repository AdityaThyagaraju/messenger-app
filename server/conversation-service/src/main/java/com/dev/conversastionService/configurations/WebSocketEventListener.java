package com.dev.conversastionService.configurations;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.GenericMessage;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import com.dev.conversastionService.clients.UserClient;
import com.dev.conversastionService.dto.StatusDto;
import com.dev.conversastionService.dto.UserDto;

@Component
public class WebSocketEventListener {
	
	@Autowired
	private UserClient userClient;
	
	private final SimpMessagingTemplate messagingTemplate;
	
	public WebSocketEventListener(SimpMessagingTemplate messagingTemplate) {
		this.messagingTemplate = messagingTemplate;
	}
	
	private String getToken(StompHeaderAccessor accessor) {
	    GenericMessage<?> generic = (GenericMessage<?>) accessor.getHeader(SimpMessageHeaderAccessor.CONNECT_MESSAGE_HEADER);
	    if (generic!=null) {
	        SimpMessageHeaderAccessor nativeAccessor = SimpMessageHeaderAccessor.wrap(generic);
	        List<String> token = nativeAccessor.getNativeHeader("Authorization");

	        return token==null ? null : token.stream().findFirst().orElse(null);
	    }

	    return null;
	}

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());

        String token = getToken(headerAccessor);
        if(token!="") {
        	UserDto user = userClient.extractUser(token).getBody();
        	for(String friendId : user.getFriendIds()) {
        		messagingTemplate.convertAndSendToUser(friendId, "/queue/messages", 
        				new StatusDto(user.getId(), "online"));
        	}
        }
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
    	StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());

        String token = getToken(headerAccessor);
        if(token!="") {
        	UserDto user = userClient.extractUser(token).getBody();
        	for(String friendId : user.getFriendIds()) {
        		messagingTemplate.convertAndSendToUser(friendId, "/queue/messages", 
        				new StatusDto(user.getId(), "offline"));
        	}
        }
    }
}
