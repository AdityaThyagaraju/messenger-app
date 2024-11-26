package com.dev.userService.dto;

import java.util.Date;
import java.util.List;

import com.dev.userService.model.User;

public class FriendDto {
		
		private String id;
		private String name;
		private String email;
		private Date dob;
		private String about;
		private String username;
		
		public FriendDto (User user) {
			this.id = user.getId();
			this.name = user.getName();
			this.about = user.getAbout();
			this.email = user.getEmail();
			this.dob = user.getDob();
			this.username = user.getUsername();
		}
		
		public String getId() {
			return id;
		}

		public void setId(String id) {
			this.id = id;
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

		@Override
		public String toString() {
			return "FriendDto [id=" + id + ", name=" + name + ", email=" + email + ", dob=" + dob + ", about=" + about
					+ ", username=" + username + "]";
		}

}
