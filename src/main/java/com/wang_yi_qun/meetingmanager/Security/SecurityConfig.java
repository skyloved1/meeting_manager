package com.wang_yi_qun.meetingmanager.Security;

import com.wang_yi_qun.meetingmanager.Model.Employee;
import com.wang_yi_qun.meetingmanager.Repository.EmployeeRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import java.util.Optional;

@Configuration
public class SecurityConfig {
    /// 选择了BCryptPasswordEncoder作为密码加密方式
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService(EmployeeRepository employeeRepository) {
        return username -> {
            var user = employeeRepository.findByEmployeeName((username));
            if (user == null) {
                throw new UsernameNotFoundException("User not found");
            }
            return user;
        };
    }

    //TODO 添加登入 注销 注册等逻辑
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http.
                authorizeHttpRequests(
                        auth -> {
                            auth.requestMatchers("/", "/**").permitAll();
                        }
                ).build();
    }
}
