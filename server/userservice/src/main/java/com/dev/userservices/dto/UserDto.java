package com.dev.userservices.dto;

import java.util.List;

import com.dev.userservices.model.User;

public class UserDto {
	
	private String name;
	private String username;
	private String token;
	private List<String> friendIds;
	private List<String> conversationIds;
	
	public UserDto(User user, String token) {
		this.name = user.getName();
		this.username = user.getUsername();
		this.token = token;
		this.friendIds = user.getFriendIds();
		this.conversationIds = user.getConversationsIds();
	}
	
	public String getToken() {
		return token;
	}
	
	public void setToken(String token) {
		this.token = token;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public List<String> getFriendIds() {
		return friendIds;
	}
	public void setFriendIds(List<String> friendIds) {
		this.friendIds = friendIds;
	}
	public List<String> getConversationIds() {
		return conversationIds;
	}
	public void setConversationIds(List<String> conversationIds) {
		this.conversationIds = conversationIds;
	}

	@Override
	public String toString() {
		return "UserDto [name=" + name + ", username=" + username + ", token=" + token + ", friendIds=" + friendIds
				+ ", conversationIds=" + conversationIds + "]";
	}
}
