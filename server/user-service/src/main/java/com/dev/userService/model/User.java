package com.dev.userService.model;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {
	
	@Id
    private String id;
	

	@Indexed(unique = true)
	private String username;
	private String password;
	private String name;
	private String email;
	private Date dob;
	private String about;
	private List<String> friendIds;
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
	public List<String> getFriendIds() {
		return friendIds;
	}
	public void setFriendIds(List<String> friendIds) {
		this.friendIds = friendIds;
	}	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Date getDob() {
		return dob;
	}
	public void setDob(Date dob) {
		this.dob = dob;
	}
	public String getAbout() {
		return about;
	}
	public void setAbout(String about) {
		this.about = about;
	}
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

	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", password=" + password + ", name=" + name + ", email="
				+ email + ", dob=" + dob + ", about=" + about + ", friendIds=" + friendIds + ", friendRequests="
				+ friendRequests + "]";
	}
	
}
