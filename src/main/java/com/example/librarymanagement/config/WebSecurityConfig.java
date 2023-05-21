package com.example.librarymanagement.config;

        import com.example.librarymanagement.entity.UserEntity;
        import com.example.librarymanagement.jwt.JwtAuthenticationFilter;
        import com.example.librarymanagement.repository.UserRepository;
        import com.example.librarymanagement.security.CustomUserDetails;
        import com.example.librarymanagement.security.CustomUserService;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.context.annotation.Bean;
        import org.springframework.context.annotation.Configuration;
        import org.springframework.http.HttpMethod;
        import org.springframework.security.authentication.AuthenticationManager;
        import org.springframework.security.config.BeanIds;
        import org.springframework.security.config.annotation.SecurityBuilder;
        import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
        import org.springframework.security.config.annotation.web.WebSecurityConfigurer;
        import org.springframework.security.config.annotation.web.builders.HttpSecurity;
        import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
        import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

        import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
        import org.springframework.security.crypto.password.PasswordEncoder;
        import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
        import org.springframework.web.reactive.function.client.WebClient;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CustomUserService userService;

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter();
    }

    @Bean(BeanIds.AUTHENTICATION_MANAGER)
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        // Get AuthenticationManager bean
        return super.authenticationManagerBean();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        // Password encoder, để Spring Security sử dụng mã hóa mật khẩu người dùng
        return new BCryptPasswordEncoder();
    }
    @Bean
    public WebClient webClient() {
        return WebClient.create();
    }


    @Override
    protected void configure(AuthenticationManagerBuilder auth)
            throws Exception {
        auth.userDetailsService(userService) // Cung cáp userservice cho spring security
                .passwordEncoder(passwordEncoder()); // cung cấp password encoder
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors()
                .and()
                .csrf()
                .disable()
                .authorizeRequests()
                .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .antMatchers("/book/**").permitAll()
                .antMatchers("/user/**").permitAll()
                .antMatchers("/category/**").permitAll()

                .anyRequest().permitAll();

        http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
    }

}
