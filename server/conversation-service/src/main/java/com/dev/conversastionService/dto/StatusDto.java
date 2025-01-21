package com.dev.conversastionService.dto;

public class StatusDto {
	
	private String messageType="Status";
	private String userId;
	private String status;
	
	public StatusDto(String userId, String status) {
		this.userId=userId;
		this.status=status;
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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "StatusDto [messageType=" + messageType + ", userId=" + userId + ", status=" + status + "]";
	}
}
