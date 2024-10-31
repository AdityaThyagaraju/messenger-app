package com.dev.userService.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.dev.userService.model.User;
import com.dev.userService.repositrories.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
	
	public User getUserByUsername(String username) {
		
		Optional<User> user = userRepository.findByUsername(username);
		return user.get();
		
	}
	
	public User getUserById(String id) {
		return userRepository.findById(id).get();
	}
	
	public void sendFriendRequest(String userId, String friendId) {
        Optional<User> userOptional = userRepository.findById(friendId);
        
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            List<String> requests = user.getFriendRequests();
            
            if (requests == null) {
            	requests = new ArrayList<String>();
            }

            if (!requests.contains(userId) && (user.getFriendIds()==null || !user.getFriendIds().contains(friendId))) {
            	requests.add(userId);
            }

            user.setFriendRequests(requests);
            userRepository.save(user);
        } else {
            throw new RuntimeException("User not found with id: " + userId);
        }
    }
	
	public String acceptFriendRequest(String userId, String friendId) {
		Optional<User> userOptional = userRepository.findById(userId);
		Optional<User> friendOptional = userRepository.findById(friendId);
		
		if(userOptional.isPresent() && friendOptional.isPresent()){
			User user = userOptional.get();
			User friend = friendOptional.get();
			
			List<String> requests = user.getFriendRequests();
			if(requests != null && requests.contains(friendId)) {
				requests.remove(friendId);
				List<String> friendIds =  user.getFriendIds();
				if(friendIds == null)
					friendIds = new ArrayList<String>();
				friendIds.add(friendId);
				user.setFriendIds(friendIds);
				userRepository.save(user);
			}
			
			List<String> friends = friend.getFriendIds();
			if(friends == null)
				friends = new ArrayList<String>();
			friends.add(userId);
			friend.setFriendIds(friends);
			userRepository.save(friend);
			return "Success";
		}
		return "Bad Request";
	}
	
	public User saveUser(User user) {
		user.setPassword(encoder.encode(user.getPassword()));
		return userRepository.save(user);
	}
}
