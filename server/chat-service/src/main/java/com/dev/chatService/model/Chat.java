package com.dev.chatService.model;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "chats")
public class Chat {
	
	@Id
	private String id;
	private String senderId;
	private String receiverId;
	private String message;
	private Date timestamp;
	
	public String getId() {
		return id;
	}
	public void setId(String chatId) {
		this.id = chatId;
	}
	public String getSenderId() {
		return senderId;
	}
	public void setSenderId(String senderId) {
		this.senderId = senderId;
	}
	public String getReceiverId() {
		return receiverId;
	}
	public void setReceiverId(String receiverId) {
		this.receiverId = receiverId;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public Date getTimestamp() {
		return timestamp;
	}
	public void setTimestamp(Date timestamp) {
		this.timestamp = timestamp;
	}
	
	@Override
	public String toString() {
		return "Chat [chatId=" + id + ", senderId=" + senderId + ", receiverId=" + receiverId + ", message="
				+ message + ", timestamp=" + timestamp + "]";
	}
	
}
