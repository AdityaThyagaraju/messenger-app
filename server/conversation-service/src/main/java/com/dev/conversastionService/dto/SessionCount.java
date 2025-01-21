package com.dev.conversastionService.dto;

public class SessionCount {
	
	private String messageType="SessionCount";
	private String userId;
	private int count;
	
	public SessionCount(String userId, int count) {
		this.userId=userId;
		this.count=count;
	}

	@Override
	public String toString() {
		return "SessionCount [messageType=" + messageType + ", userId=" + userId + ", count=" + count + "]";
	}

	public String getMessageType() {
		return messageType;
	}

	public void setMessageType(String messageType) {
		this.messageType = messageType;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

}
