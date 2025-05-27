package com.myapp.QLCT.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        
        // Sử dụng allowedOriginPattern thay vì allowedOrigin
        config.addAllowedOriginPattern("http://localhost:4200");
        
        // Cho phép các methods
        config.addAllowedMethod("*");
        
        // Cho phép các headers
        config.addAllowedHeader("*");
        
        // Cho phép credentials
        config.setAllowCredentials(true);
        
        // Thiết lập max age
        config.setMaxAge(3600L);
        
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}