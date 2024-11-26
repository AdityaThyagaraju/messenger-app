package com.dev.chatService.configurations;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.dev.chatService.filters.JwtFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig{
	
	@Autowired
	private JwtFilter jwtFilter;
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity security) throws Exception {
		return security
				.cors(cors -> 
				cors.configurationSource(corsConfigurationSource())
				)
				.csrf(customizer -> customizer.disable())
				.authorizeHttpRequests(request -> request
							.requestMatchers("/chats/**").authenticated()
							.anyRequest().denyAll())
				.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
				.sessionManagement(customizer -> customizer.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.build();
	}
	
	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
	    CorsConfiguration configuration = new CorsConfiguration();
	    configuration.addAllowedOriginPattern("*"); 
	    configuration.addAllowedMethod("*"); 
	    configuration.addAllowedHeader("*"); 
	    configuration.setAllowCredentials(true);
	    UrlBasedCorsConfigurationSource source = new 
	     UrlBasedCorsConfigurationSource();
	    source.registerCorsConfiguration("/**", configuration);
	    return source;
	}
}
