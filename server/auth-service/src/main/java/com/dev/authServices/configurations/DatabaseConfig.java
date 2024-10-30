package com.dev.authServices.configurations;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;

@Configuration
public class DatabaseConfig extends AbstractMongoClientConfiguration {
	
    @Override
    protected String getDatabaseName() {
        return "usersDB";
    }

    @Bean
    @Override
    public MongoClient mongoClient() {
        String connectionString = "mongodb+srv://adityauday2002:LkLWnvycMztzmwN3@cluster0.ihnpy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0mongodb+srv://adityauday2002:LkLWnvycMztzmwN3@cluster0.ihnpy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
        return MongoClients.create(connectionString);
    }

    @Override
    protected boolean autoIndexCreation() {
        return true;
    }
}