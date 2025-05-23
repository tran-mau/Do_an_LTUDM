public class SecurityConfig {
    
    @Bean
    public HttpSecurity httpSecurity(HttpSecurity http) throws Exception {
        http
            .cors(withDefaults())
            .csrf()
            .authorizeRequests()
                .antMatchers("/api/auth/login", "/api/auth/register").permitAll()
                .anyRequest().authenticated()
            .and()
            .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .addFilterBefore(new JwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
        return http;
    }
}
