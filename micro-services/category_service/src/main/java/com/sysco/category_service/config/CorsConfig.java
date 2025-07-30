package com.sysco.category_service.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class CorsConfig {

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // Allow only localhost:9001
        configuration.addAllowedOrigin("http://localhost:9001");
        
        // Allow all headers
        configuration.addAllowedHeader("*");
        
        // Allow all methods
        configuration.addAllowedMethod("*");
        
        // Allow credentials
        configuration.setAllowCredentials(true);
        
        // Cache preflight response
        configuration.setMaxAge(3600L);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        
        return source;
    }
}
