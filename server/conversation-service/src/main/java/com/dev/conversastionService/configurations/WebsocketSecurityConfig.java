package com.dev.conversastionService.configurations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.SimpMessageType;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.messaging.MessageSecurityMetadataSourceRegistry;
import org.springframework.security.config.annotation.web.socket.AbstractSecurityWebSocketMessageBrokerConfigurer;
import org.springframework.security.config.annotation.web.socket.EnableWebSocketSecurity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import com.dev.conversastionService.clients.UserClient;
import com.dev.conversastionService.dto.UserDto;
import com.dev.conversastionService.model.UserPrincipal;

@Configuration
@EnableWebSocketMessageBroker
public class WebsocketSecurityConfig extends AbstractSecurityWebSocketMessageBrokerConfigurer implements WebSocketMessageBrokerConfigurer {
	
	@Autowired
	UserClient userClient;
	
	@Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/user");
        config.setApplicationDestinationPrefixes("/connection");
        config.setUserDestinationPrefix("/user");
    }
	
	@Override
    protected boolean sameOriginDisabled() {
        return true;
    }
	
	@Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry
        	.addEndpoint("/connect")
        	.setAllowedOriginPatterns("*")
        	.withSockJS();
    }
	
    @Override
    protected void configureInbound(MessageSecurityMetadataSourceRegistry messages) {
        messages	
                .simpMessageDestMatchers("/user/**").denyAll()
                .anyMessage().permitAll();
    }
    
    @Override
    public void customizeClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(new ChannelInterceptor() {
            @Override
            public Message<?> preSend(Message<?> message, MessageChannel channel) {
                StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
                
                if (accessor != null && StompCommand.CONNECT.equals(accessor.getCommand())) {
                    String authHeader = accessor.getFirstNativeHeader("Authorization");
                    if (authHeader != null && authHeader.startsWith("Bearer ")) {
                        try {
                            ResponseEntity<UserDto> userDto = userClient.extractUser(authHeader);
                            UserDto user = userDto.getBody();
                            if (user != null) {
                                UserPrincipal userDetails = new UserPrincipal(user);
                                UsernamePasswordAuthenticationToken authentication =
                                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                                SecurityContextHolder.getContext().setAuthentication(authentication);
                                accessor.setUser(authentication);
                                System.out.println("User authenticated: " + 
                                ((UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername());
                            } else {
                                throw new SecurityException("User extraction failed.");
                            }
                        } catch (Exception e) {
                            throw new SecurityException("Invalid authentication token. Connection rejected.");
                        }
                    } else {
                        throw new SecurityException("Invalid or missing Authorization header.");
                    }
                }

                return message;
            }
        });
    }
}