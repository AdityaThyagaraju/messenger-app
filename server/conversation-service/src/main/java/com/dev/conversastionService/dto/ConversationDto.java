//package com.dev.conversastionService.dto;
//
//import java.util.Date;
//import java.util.List;
//
//import org.springframework.data.annotation.Id;
//import org.springframework.data.mongodb.core.mapping.Document;
//
//import com.dev.conversastionService.model.Conversation;
//
//@Document(collection = "conversations")
//public class ConversationDto {
//	
//	@Id
//	private String id;
//	private String user1Id;
//	private String user2Id;
//	private String lastMessage;
//	private String lastMessageSenderName;
//	private Date lastMessageTime;
//	private List<ChatDto> chats;
//	
//	public ConversationDto(){}
//	public ConversationDto(Conversation conversation){
//		this.id = conversation.getId();
//		this.user1Id = conversation.getUser1Id();
//		this.user2Id = conversation.getUser2Id();
//		this.lastMessage = conversation.getLastMessage();
//		this.lastMessageSenderName = conversation.getLastMessageSenderName();
//		this.lastMessageTime = conversation.getLastMessageTime();
//	}
//	
//	public String getId() {
//		return id;
//	}
//	public void setId(String id) {
//		this.id = id;
//	}
//	public String getUser1Id() {
//		return user1Id;
//	}
//	public void setUser1Id(String user1Id) {
//		this.user1Id = user1Id;
//	}
//	public String getUser2Id() {
//		return user2Id;
//	}
//	public void setUser2Id(String user2Id) {
//		this.user2Id = user2Id;
//	}
//	public String getLastMessage() {
//		return lastMessage;
//	}
//	public void setLastMessage(String lastMessage) {
//		this.lastMessage = lastMessage;
//	}
//	public Date getLastMessageTime() {
//		return lastMessageTime;
//	}
//	public void setLastMessageTime(Date lastMessageTime) {
//		this.lastMessageTime = lastMessageTime;
//	}	
//	public List<ChatDto> getChats() {
//		return chats;
//	}
//	public void setChats(List<ChatDto> chats) {
//		this.chats = chats;
//	}	
//	public String getLastMessageSenderName() {
//		return lastMessageSenderName;
//	}
//	public void setLastMessageSenderName(String lastMessageSenderName) {
//		this.lastMessageSenderName = lastMessageSenderName;
//	}
//	
//	@Override
//	public String toString() {
//		return "ConversationDto [id=" + id + ", user1Id=" + user1Id + ", user2Id=" + user2Id + ", lastMessage="
//				+ lastMessage + ", lastMessageSenderName=" + lastMessageSenderName + ", lastMessageTime="
//				+ lastMessageTime + ", chats=" + chats + "]";
//	}
//}
//
