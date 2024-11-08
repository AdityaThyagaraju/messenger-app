package com.dev.conversastionService.model;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "conversations")
public class Conversation {
	
	@Id
	private String id;
	private String user1Id;
	private String user2Id;
	private String lastMessage;
	private String lastMessageSenderName;
	private Date lastMessageTime;
	private List<String> chatIds;
	
	public Conversation(){}
	public Conversation(String user1Id, String user2Id){
		this.user1Id = user1Id;
		this.user2Id = user2Id;
	}
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getUser1Id() {
		return user1Id;
	}
	public void setUser1Id(String user1Id) {
		this.user1Id = user1Id;
	}
	public String getUser2Id() {
		return user2Id;
	}
	public void setUser2Id(String user2Id) {
		this.user2Id = user2Id;
	}
	public String getLastMessage() {
		return lastMessage;
	}
	public void setLastMessage(String lastMessage) {
		this.lastMessage = lastMessage;
	}
	public Date getLastMessageTime() {
		return lastMessageTime;
	}
	public void setLastMessageTime(Date lastMessageTime) {
		this.lastMessageTime = lastMessageTime;
	}
	public List<String> getChatIds() {
		return chatIds;
	}
	public void setChatIds(List<String> chatIds) {
		this.chatIds = chatIds;
	}
	public String getLastMessageSenderName() {
		return lastMessageSenderName;
	}
	public void setLastMessageSenderName(String lastMessageSenderName) {
		this.lastMessageSenderName = lastMessageSenderName;
	}
	
	@Override
	public String toString() {
		return "Conversation [id=" + id + ", user1Id=" + user1Id + ", user2Id=" + user2Id + ", lastMessage="
				+ lastMessage + ", lastMessageSenderName=" + lastMessageSenderName + ", lastMessageTime="
				+ lastMessageTime + ", chatIds=" + chatIds + "]";
	}
}
