package com.dev.userService.repositrories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.dev.userService.model.User;


public interface UserRepository extends MongoRepository<User, String>{
	
	@Query("{ 'username' : ?0 }")
    public Optional<User> findByUsername(String username);
	
}
