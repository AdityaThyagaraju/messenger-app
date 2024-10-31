package com.dev.conversastionService.model;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.dev.conversastionService.dto.UserDto;

public class UserPrincipal implements UserDetails {
	
	private UserDto user;
	
	public UserPrincipal() {
		super();
	}

	public UserPrincipal(UserDto user){
		this.user = user;
	}
	
	public UserDto getUser() {
		return user;
	}
	
	public void setUser(UserDto user) {
		this.user = user;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return null;
	}

	@Override
	public String getPassword() {
		return null;
	}

	@Override
	public String getUsername() {
		return null;
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
