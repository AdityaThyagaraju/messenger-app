package com.dev.authServices.repositrories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.dev.authServices.model.User;


public interface UserRepository extends MongoRepository<User, String>{

}
