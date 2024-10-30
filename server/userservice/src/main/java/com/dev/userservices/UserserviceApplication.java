package com.dev.userservices;

import java.util.ArrayList;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import com.dev.userservices.model.User;
import com.dev.userservices.repositrories.UserRepository;

@SpringBootApplication
public class UserserviceApplication {

	public static void main(String[] args) {
		ApplicationContext ctx = SpringApplication.run(UserserviceApplication.class, args);
//		UserRepository repo = ctx.getBean(UserRepository.class);
		
//		User user = new User();
//		user.setUsername("Aditya");
//		user.setName("Adi");
//		user.setConversationsIds(new ArrayList<String>());
//		repo.save(user);
		
	}

}
