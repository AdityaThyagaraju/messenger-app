package com.dev.conversastionService.repositrories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import com.dev.conversastionService.model.Conversation;

@EnableMongoRepositories
public interface ConversationRepo extends MongoRepository<Conversation, String> {
	
	@Query("{ '$or': [ { 'user1Id': ?0 , 'user2Id' : ?1 }, { 'user2Id': ?0 , 'user1Id' : ?1 } ] }")
	public Conversation findConversation(String user1Id, String user2Id);
	
	@Query("{ '$or' : [ { 'user1Id' : ?0 }, { 'user2Id' : ?0 } ] }")
	public List<Conversation> findAllConversationsOfUser(String userId);

}
