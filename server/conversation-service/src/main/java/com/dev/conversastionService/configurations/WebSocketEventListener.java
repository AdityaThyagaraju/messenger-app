package com.dev.conversastionService.configurations;

import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.GenericMessage;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import com.dev.conversastionService.Stores.StatusStore;
import com.dev.conversastionService.clients.UserClient;
import com.dev.conversastionService.dto.StatusDto;
import com.dev.conversastionService.dto.UserDto;

@Component
public class WebSocketEventListener implements ApplicationListener<SessionDisconnectEvent> {

    @Autowired
    private UserClient userClient;

    @Autowired
    private StatusStore statusStore;

    private final SimpMessagingTemplate messagingTemplate;

    private final Map<String, String> sessionUserMap = new ConcurrentHashMap<>();

    public WebSocketEventListener(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    private String getToken(StompHeaderAccessor accessor) {
        GenericMessage<?> generic = (GenericMessage<?>) accessor.getHeader(SimpMessageHeaderAccessor.CONNECT_MESSAGE_HEADER);
        if (generic != null) {
            SimpMessageHeaderAccessor nativeAccessor = SimpMessageHeaderAccessor.wrap(generic);
            List<String> token = nativeAccessor.getNativeHeader("Authorization");
            return token == null ? null : token.stream().findFirst().orElse(null);
        }
        return null;
    }

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String token = getToken(headerAccessor);
        
        if (token != null && !token.isEmpty()) {
            UserDto user = userClient.extractUser(token).getBody();
            if (user != null) {
                sessionUserMap.put(headerAccessor.getSessionId(), token);
                statusStore.setOnline(user.getId());
                for (String friendId : user.getFriendIds()) {
                    messagingTemplate.convertAndSendToUser(friendId, "/queue/messages", 
                            new StatusDto(user.getId(), "online"));
                }
            }
        }
    }

    @Override
    public void onApplicationEvent(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = headerAccessor.getSessionId();
        String token = sessionUserMap.remove(sessionId);
        
        if (token != null) {
            UserDto user = userClient.extractUser(token).getBody();
            statusStore.setOffline(user.getId());
            if (user != null) {
                for (String friendId : user.getFriendIds()) {
                    messagingTemplate.convertAndSendToUser(friendId, "/queue/messages", 
                            new StatusDto(user.getId(), "offline"));
                }
            }
        }
    }

    
//    @EventListener
//    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
//    	StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
//    	System.out.println("###########################hererererere");
//        String token = getToken(headerAccessor);
//        if(token!="") {
//        	UserDto user = userClient.extractUser(token).getBody();
//        	for(String friendId : user.getFriendIds()) {
//        		messagingTemplate.convertAndSendToUser(friendId, "/queue/messages", 
//        				new StatusDto(user.getId(), "offline"));
//        	}
//        }
//    }
}
