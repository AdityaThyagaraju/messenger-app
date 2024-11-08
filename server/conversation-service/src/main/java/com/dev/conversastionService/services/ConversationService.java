package com.dev.conversastionService.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dev.conversastionService.dto.ChatDto;
import com.dev.conversastionService.dto.UserDto;
import com.dev.conversastionService.model.Conversation;
import com.dev.conversastionService.repositrories.ConversationRepo;

@Service
public class ConversationService {
	
	@Autowired
	private ConversationRepo conversationRepository;
	
	public Conversation getConversation(String user1Id, String user2Id) {
		
		Conversation conv = conversationRepository.findConversation(user1Id, user2Id);
		if(conv == null) {
			conv = new Conversation(user1Id, user2Id);
			return conversationRepository.save(conv);
		}
		return conv;				
	}
	
	public String sendMessage(UserDto user, ChatDto chat) {
		
		String sender = user.getId();
		String receiver = chat.getReceiverId();
		String message = chat.getMessage();
		List<String> friendIds = user.getFriendIds();
		
		if(friendIds.indexOf(receiver) == -1)
			return "Messages can be sent only to friends";
		
//		String chatId = chatClient.save(chat);
//		
//		Conversation conversation = getConversation(sender, receiver);
//		List<String> chatIds = conversation.getChatIds();
//		
//		if(chatIds == null) {
//			chatIds = new ArrayList<String>();
//		}
//		
//		chatIds.add(chatId);
//		conversation.setChatIds(chatIds);
//		conversation.setLastMessage(chat.getMessage());
//		conversation.setLastMessageSenderName(user.getName());
//		conversation.setLastMessageTime(chat.getTimestamp());
//		conversationRepository.save(conversation);
		
		return "Success";
	}
	
	public List<Conversation> getConversations(UserDto user){
		
		return conversationRepository.findAllConversationsOfUser(user.getId());
		
	}
	
}
