package com.dev.conversastionService.dto;

import java.util.List;

public class UserDto {
	
	private String id;
	private String name;
	private String username;
	private String token;
	private List<String> friendIds;
	private List<String> conversationIds;
	private List<String> friendRequests;
	
	public List<String> getFriendRequests() {
		return friendRequests;
	}
	public void setFriendRequests(List<String> friendRequests) {
		this.friendRequests = friendRequests;
	}
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
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
