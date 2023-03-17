package com.ufps.userProfile;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.ufps.userProfile.repository")
public class UserProfileApplication {
	public static void main(String[] args) {
		SpringApplication.run(UserProfileApplication.class, args);
	}

}
