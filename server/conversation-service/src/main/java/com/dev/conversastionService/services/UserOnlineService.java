package com.dev.conversastionService.services;

import java.util.HashMap;

public class UserOnlineService {
	
	private HashMap<String, Integer> connections = new HashMap<>();
	
	public void connectUser(String userId) {
		if(!connections.containsKey(userId)) 
			connections.put(userId, 0);
		
		connections.put(userId, connections.get(userId)+1);
	}
	
	public boolean disconnectUser(String userId) {
		if(!connections.containsKey(userId)) 
			return true;
		connections.put(userId, connections.get(userId)-1);
		if(connections.get(userId)==-1) {
			connections.remove(userId);
			return true;
		}
		return false;
	}

}
