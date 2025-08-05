package com.courier;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}
	 @Bean
	    public ModelMapper modelMapper() {
	        ModelMapper modelMapper = new ModelMapper();

	        // Optional: Fine-tune matching strategy
	        modelMapper.getConfiguration()
	                .setFieldMatchingEnabled(true)
	                .setFieldAccessLevel(org.modelmapper.config.Configuration.AccessLevel.PRIVATE)
	                .setMatchingStrategy(org.modelmapper.convention.MatchingStrategies.STRICT);

	        return modelMapper;
	    }
} 
