package com.dev.conversastionService.dto;

import java.util.Date;

public class ChatDto {
	
	private String chatId;
	private String senderId;
	private String receiverId;
	private String message;
	private Date timestamp;
	
	public String getChatId() {
		return chatId;
	}
	public void setChatId(String chatId) {
		this.chatId = chatId;
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
		return "ChatDto [chatId=" + chatId + ", senderId=" + senderId + ", receiverId=" + receiverId + ", message="
				+ message + ", timestamp=" + timestamp + "]";
	}
	
}
