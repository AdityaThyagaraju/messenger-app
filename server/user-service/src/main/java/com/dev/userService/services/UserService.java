package com.dev.userService.services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.convert.MongoConverter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.dev.userService.dto.FriendDto;
import com.dev.userService.model.User;
import com.dev.userService.repositrories.UserRepository;
import com.mongodb.client.AggregateIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

@Service
public class UserService {
	
	@Autowired
	MongoClient mongoClient;
	
	@Autowired
	MongoConverter mongoConverter;
	
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
        Optional<User> currentOptional = userRepository.findById(userId);
        
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            User current = currentOptional.get();
            
            List<String> requests = user.getFriendRequests();
            
            if (requests == null) {
            	requests = new ArrayList<String>();
            }

            if (!requests.contains(userId) && (user.getFriendIds()==null || !user.getFriendIds().contains(friendId))) {
            	requests.add(userId);
            }

            user.setFriendRequests(requests);
            userRepository.save(user);
            
            List<String> pendingRequests = current.getPendingRequests();
            
            if(pendingRequests == null)
            	pendingRequests = new ArrayList<>();
            
            if(!pendingRequests.contains(friendId)) {
            	pendingRequests.add(friendId);
            	current.setPendingRequests(pendingRequests);
            }
            
            userRepository.save(current);
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
				user.setFriendRequests(requests);
				List<String> friendIds =  user.getFriendIds();
				if(friendIds == null)
					friendIds = new ArrayList<String>();
				friendIds.add(friendId);
				user.setFriendIds(friendIds);
				userRepository.save(user);
			}
			
			List<String> pendingRequests = friend.getPendingRequests();
			if(pendingRequests != null && pendingRequests.contains(userId)) {
				pendingRequests.remove(userId);
			}
			friend.setPendingRequests(pendingRequests);
			
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
	
	
	public List<FriendDto> searchUser(String query){
		
		List<FriendDto> userList = new ArrayList<>();
		
		MongoDatabase database = mongoClient.getDatabase("usersDB");
		MongoCollection<Document> collection = database.getCollection("users");
		AggregateIterable<Document> result = collection.aggregate(Arrays.asList(new Document("$search", 
		    new Document("index", "userSearch")
		            .append("text", 
		    new Document("query", query)
		                .append("path", Arrays.asList("username", "name", "email"))))));
		
		result.forEach(user -> userList.add(new FriendDto(mongoConverter.read(User.class, user))));
		return userList;
	}

	public String rejectFriendRequest(String userId, String friendId) {
		Optional<User> userOptional = userRepository.findById(userId);
		Optional<User> friendOptional = userRepository.findById(friendId);
		
		if(userOptional.isPresent() && friendOptional.isPresent()){
			User user = userOptional.get();
			User friend = friendOptional.get();
			
			List<String> requests = user.getFriendRequests();
			if(requests != null && requests.contains(friendId)) {
				requests.remove(friendId);
				user.setFriendRequests(requests);
				userRepository.save(user);
			}
			
			List<String> pendingRequests = friend.getPendingRequests();
			if(pendingRequests != null && pendingRequests.contains(userId)) {
				pendingRequests.remove(userId);
			}
			friend.setPendingRequests(pendingRequests);
			userRepository.save(friend);
			
			return "Success";
		}
		return "Bad Request";
	}
}
