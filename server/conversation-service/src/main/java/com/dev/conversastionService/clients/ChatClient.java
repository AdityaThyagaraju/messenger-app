package com.dev.conversastionService.clients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import com.dev.conversastionService.dto.ChatDto;
import com.dev.conversastionService.dto.UserDto;

@FeignClient("CHAT-SERVICE")
public interface ChatClient {
	
    @PostMapping("chats")
    public ResponseEntity<String> saveChat(@RequestHeader("Authorization") String token, @RequestBody ChatDto chat);
    
    @GetMapping("chats/{id}")
    public ResponseEntity<ChatDto> getChat(@RequestHeader("Authorization") String token, @PathVariable("id") String id);

}