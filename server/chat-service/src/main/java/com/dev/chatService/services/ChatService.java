package com.dev.chatService.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.dev.chatService.dto.UserDto;
import com.dev.chatService.model.Chat;
import com.dev.chatService.model.UserPrincipal;
import com.dev.chatService.repositrories.ChatRepository;

@Service
public class ChatService {
	
	@Autowired
	private ChatRepository chatRepository;
		
	public Chat getChat(String chatId, UserDto user) {
		Optional<Chat> optionalChat = chatRepository.findById(chatId);
		
		if(optionalChat.isEmpty())
			return null;
		
		Chat chat = optionalChat.get();
		
		if(!chat.getReceiverId().equals(user.getId()) && !chat.getSenderId().equals(user.getId()))
			return null;
		
		return chat;
	}
	
	public Chat saveChat(Chat chat, UserDto user) {
		
		Chat savedChat = null;
		
		if(chat.getReceiverId().equals(user.getId())) {
			if(user.getFriendIds().indexOf(chat.getSenderId()) == -1)
				return null;
			savedChat = chatRepository.save(chat);
		}
		
		if(chat.getSenderId().equals(user.getId())) {
			if(user.getFriendIds().indexOf(chat.getReceiverId()) == -1)
				return null;
			savedChat = chatRepository.save(chat);
		}
		
		return savedChat;
	}
	
}
