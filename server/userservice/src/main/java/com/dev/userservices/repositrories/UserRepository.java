package com.dev.userservices.repositrories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.dev.userservices.model.User;


public interface UserRepository extends MongoRepository<User, String>{

}
