package com.dev.userService.model;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class UserPrincipal implements UserDetails {
	
	private User user;
	

	public UserPrincipal(User user){
		this.user = user;
	}
	
	public User getUser() {
		return user;
	}
	
	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return null;
	}

	@Override
	public String getPassword() {
		return user.getPassword();
	}

	@Override
	public String getUsername() {
		return user.getUsername();
	}
	
//	@Override
//	public boolean isAccountNonExpired() {
//		return true;
//	}
//	
//	@Override
//	public boolean isAccountNonLocked() {
//		return true;
//	}
}
