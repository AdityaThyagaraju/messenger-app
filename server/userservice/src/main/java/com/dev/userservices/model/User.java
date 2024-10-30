package com.dev.userservices.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {
	
	@Indexed(unique = true)
	private String username;
	private String password;
	private String name;
	private List<String> friendIds;
	
	public List<String> getFriendIds() {
		return friendIds;
	}
	public void setFriendIds(List<String> friendIds) {
		this.friendIds = friendIds;
	}

	private List<String> conversationsIds;
	
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public List<String> getConversationsIds() {
		return conversationsIds;
	}
	public void setConversationsIds(List<String> conversationsIds) {
		this.conversationsIds = conversationsIds;
	}

	@Override
	public String toString() {
		return "User [username=" + username + ", password=" + password + ", name=" + name + ", friendIds=" + friendIds
				+ ", conversationsIds=" + conversationsIds + "]";
	}
	
}
