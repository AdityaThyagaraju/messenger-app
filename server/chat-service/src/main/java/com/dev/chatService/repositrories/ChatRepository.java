package com.dev.chatService.repositrories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import com.dev.chatService.model.Chat;

@EnableMongoRepositories
public interface ChatRepository extends MongoRepository<Chat, String> {

}
