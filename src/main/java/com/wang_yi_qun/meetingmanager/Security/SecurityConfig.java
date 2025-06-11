package com.wang_yi_qun.meetingmanager.Security;

import com.wang_yi_qun.meetingmanager.Model.Employee;
import com.wang_yi_qun.meetingmanager.Repository.EmployeeRepository;
import lombok.AllArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import java.util.Optional;

@Configuration
@AllArgsConstructor
public class SecurityConfig {

    final EmployeeRepository employeeRepository;
    final CustomAuthenticationProvider authenticationProvider;



    @Bean
    public UserDetailsService userDetailsService(EmployeeRepository employeeRepository) {
        return username -> {
            var optionalEmployee = employeeRepository.findByUsername((username));
            if (optionalEmployee.isEmpty()) {
                throw new UsernameNotFoundException("User not found");
            }
            return optionalEmployee.get();
        };
    }

    //TODO 添加登入 注销 注册等逻辑
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .authenticationProvider(authenticationProvider)
                .authorizeHttpRequests(
                        auth -> {
                            auth.requestMatchers("/", "/**").permitAll();
                            auth.requestMatchers("/api/login").permitAll();
                        }
                )
                .formLogin(
                        (form) -> {
                            form.loginProcessingUrl("/api/login");
                            form.usernameParameter("username");
                            form.passwordParameter("password");
                            form.successHandler((request, response, authentication) -> {
                                // 登录成功后返回一个JSON对象
                                response.setContentType("application/json");
                                response.getWriter().write("{\"status\": 200, \"message\": \"Login successful\"}");
                            });
                            form.failureHandler((request, response, authentication) -> {
                                JSONObject jsonResponse = new JSONObject();
                                response.setContentType("application/json,charset=UTF-8");
                                jsonResponse.put("status", HttpStatus.UNAUTHORIZED.value());
                                jsonResponse.put("message", "Login failed: " + authentication.getMessage());
                                response.getWriter().write(jsonResponse.toString());

                            });
                        }
                ).logout(
                        (logout) -> {
                            logout.logoutUrl("/api/logout");
                            logout.clearAuthentication(true);
                            logout.invalidateHttpSession(true);
                            logout.deleteCookies("JSESSIONID");

                            logout.logoutSuccessHandler((request, response, authentication) -> {
                                JSONObject jsonObject = new JSONObject();
                                jsonObject.put("status", 200);
                                jsonObject.put("username", authentication != null ? authentication.getName() : "anonymous");
                                jsonObject.put("message", "Logout successful");
                                if (authentication != null && authentication.getPrincipal() instanceof Employee employee) {
                                    // 可以在这里设置用户状态为未登录
                                    employee.setStatus(1); // 假设1表示未登录状态
                                    employeeRepository.save(employee);
                                }
                                response.setContentType("application/json");
                                response.getWriter().write(jsonObject.toString());
                            });
                        }
                )
                .csrf(csrf -> csrf.disable()) // 禁用CSRF保护

                .build();
    }
}
