package com.SABSPL.sabsep;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.bind.annotation.CrossOrigin;

@EnableScheduling
@EnableMongoAuditing
@SpringBootApplication
@CrossOrigin("localhost:4200")
public class SabsepBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(SabsepBackendApplication.class, args);
	}

}
