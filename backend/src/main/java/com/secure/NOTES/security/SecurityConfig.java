package com.secure.NOTES.security;

import com.secure.NOTES.config.OAuth2LoginSuccessHandler;
import com.secure.NOTES.models.AppRole;
import com.secure.NOTES.models.Role;
import com.secure.NOTES.models.User;
import com.secure.NOTES.repositories.RoleRepository;
import com.secure.NOTES.repositories.UserRepository;
import com.secure.NOTES.security.jwt.AuthEntryPointJwt;
import com.secure.NOTES.security.jwt.AuthTokenFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;


import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.sql.DataSource;

import java.time.LocalDate;
import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true, // This enables Preauthorized and Postauthorized annotations
    securedEnabled = true, // enable Secured Annotation
    jsr250Enabled = true) // enable Roles Allowed Annotation
public class SecurityConfig {
    @Autowired
    private AuthEntryPointJwt unauthorizedHandler;

    @Autowired
            @Lazy
    OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;

    @Bean
    public AuthTokenFilter authenticationJwtTokenFilter() {
        return new AuthTokenFilter();
    }


//    @Bean
//    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception{
//        http.authorizeHttpRequests((requests->
//                requests
//                        .requestMatchers("/contact").permitAll()
//                        .requestMatchers("/public/**").permitAll()
//                        .anyRequest().authenticated()));
//       //  http.formLogin(withDefaults());
//        http.csrf(csrf-> csrf.disable());
//        http.sessionManagement(session-> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)); // In Stateless authentication the server do  not store any session of the user in the server.
//        //In short, stateless authentication is like having a digital ID card (the token) that you show every time you want to access something, and the server just checks the ID card instead of remembering who you are.
//        http.httpBasic(withDefaults());
//        return http.build();
 //   }


        @Bean
        SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
          //  http.authorizeHttpRequests((requests) -> requests.anyRequest().authenticated());
            http.authorizeHttpRequests((requests)
                    -> requests
                    .requestMatchers("/api/admin/**").hasRole("ADMIN")
                    .requestMatchers("/api/csrf-token").permitAll()
                    .requestMatchers("/api/auth/public/**").permitAll()
                            .requestMatchers("/oauth2/**").permitAll()

                    .anyRequest().authenticated())
            .oauth2Login(oauth2->{
                oauth2.successHandler(oAuth2LoginSuccessHandler);
                

            });
            http.csrf(csrf-> csrf.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                    .ignoringRequestMatchers("/api/auth/public/**"));
        //    http.csrf(csrf-> csrf.disable());
//            http.addFilterBefore(new CustomLoggingFilter(), UsernamePasswordAuthenticationFilter.class);
//            http.addFilterAfter(new RequestValidationFilter(), CustomLoggingFilter.class);

        //    http.formLogin(withDefaults());
            http.exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler));
            http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);

            http.cors(
                    cors -> cors.configurationSource(corsConfigurationSource())
            );


            http.httpBasic(withDefaults());
            return http.build();
        }

        @Bean
        public PasswordEncoder passwordEncoder(){
            return new BCryptPasswordEncoder();
        }
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }


//    @Bean
//    public UserDetailsService userDetailsService() {
//        InMemoryUserDetailsManager manager =
//                new InMemoryUserDetailsManager();
//        if (!manager.userExists("user1")) {
//            manager.createUser(
//                    User.withUsername("user1")
//                            .password("{noop}password1")
//                            .roles("USER")
//                            .build()
//            );
//        }
//        if (!manager.userExists("admin")) {
//            manager.createUser(
//                    User.withUsername("admin")
//                            .password("{noop}adminPass")
//                            .roles("ADMIN")
//                            .build()
//            );
//        }
//        return manager;
//    }


//    @Bean
//    public UserDetailsService userDetailsService(DataSource dataSource) { // we also have to pass the Datasource from where the users are authenticated here the datasource is Mysql
//        JdbcUserDetailsManager manager =
//                new JdbcUserDetailsManager(dataSource);
//        if (!manager.userExists("user1")) {
//            manager.createUser(
//                    User.withUsername("user1")
//                            .password("{noop}password1")
//                            .roles("USER")
//                            .build()
//            );
//        }
//        if (!manager.userExists("admin")) {
//            manager.createUser(
//                    User.withUsername("admin")
//                            .password("{noop}adminPass")
//                            .roles("ADMIN")
//                            .build()
//            );
//        }
//        return manager;
//    }
@Bean
public CommandLineRunner initData(RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
    return args -> {
        Role userRole = roleRepository.findByRoleName(AppRole.ROLE_USER)
                .orElseGet(() -> roleRepository.save(new Role(AppRole.ROLE_USER)));

        Role adminRole = roleRepository.findByRoleName(AppRole.ROLE_ADMIN)
                .orElseGet(() -> roleRepository.save(new Role(AppRole.ROLE_ADMIN)));

        if (!userRepository.existsByUserName("user1")) {
            User user1 = new User("user1", "user1@example.com",
                    passwordEncoder.encode("password1"));
            user1.setAccountNonLocked(false);
            user1.setAccountNonExpired(true);
            user1.setCredentialsNonExpired(true);
            user1.setEnabled(true);
            user1.setCredentialsExpiryDate(LocalDate.now().plusYears(1));
            user1.setAccountExpiryDate(LocalDate.now().plusYears(1));
            user1.setTwoFactorEnabled(false);
            user1.setSignUpMethod("email");
            user1.setRole(userRole);
            userRepository.save(user1);
        }

        if (!userRepository.existsByUserName("admin")) {
            User admin = new User("admin", "admin@example.com", passwordEncoder.encode("adminPass"));
            admin.setAccountNonLocked(true);
            admin.setAccountNonExpired(true);
            admin.setCredentialsNonExpired(true);
            admin.setEnabled(true);
            admin.setCredentialsExpiryDate(LocalDate.now().plusYears(1));
            admin.setAccountExpiryDate(LocalDate.now().plusYears(1));
            admin.setTwoFactorEnabled(false);
            admin.setSignUpMethod("email");
            admin.setRole(adminRole);
            userRepository.save(admin);
        }
    };
}

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfig = new CorsConfiguration();
        // Allow specific origins
        corsConfig.setAllowedOrigins(Arrays.asList("http://localhost:3000"));

        // Allow specific HTTP methods
        corsConfig.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        // Allow specific headers
        corsConfig.setAllowedHeaders(Arrays.asList("*"));
        // Allow credentials (cookies, authorization headers)
        corsConfig.setAllowCredentials(true);
        corsConfig.setMaxAge(3600L);
        // Define allowed paths (for all paths use "/**")
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfig); // Apply to all endpoints
        return source;
    }

}


