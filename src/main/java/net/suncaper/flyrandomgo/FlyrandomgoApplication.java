package net.suncaper.flyrandomgo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication
//@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)
public class FlyrandomgoApplication {

    public static void main(String[] args) {
        SpringApplication.run(FlyrandomgoApplication.class, args);
    }

}
