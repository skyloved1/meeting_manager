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
import org.springframework.security.config.annotation.web.configurers.DefaultLoginPageConfigurer;
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



    //TODO 没有禁用默认登入页面
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
                                final var json=new JSONObject();
                                json.put("status", HttpStatus.OK.value());
                                json.put("username", ((Employee) authentication.getPrincipal()).getEmployeeName());
                                json.put("message", "Login successful");
                                response.setContentType("application/json");
                                response.setCharacterEncoding("UTF-8");
                                response.getWriter().write(json.toString());
                            });
                            form.failureHandler((request, response, authentication) -> {
                                JSONObject jsonResponse = new JSONObject();
                                response.setContentType("application/json");
                                response.setCharacterEncoding("UTF-8");
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
                                if (authentication != null && authentication.getPrincipal() instanceof Employee employee) {
                                    // 在清除认证信息前获取用户名
                                    jsonObject.put("username", employee.getEmployeeName());
                                    // 设置用户状态为未登录
                                    employee.setStatus(1); // 假设1表示未登录状态
                                    employeeRepository.save(employee);
                                } else {
                                    jsonObject.put("username", "anonymous");
                                }
                                jsonObject.put("status", 200);
                                jsonObject.put("message", "Logout successful");

                                response.setContentType("application/json");
                                response.setCharacterEncoding("UTF-8");
                                response.getWriter().write(jsonObject.toString());
                            });
                        }
                )
                .csrf(csrf -> csrf.disable()) // 禁用CSRF保护

                .build();
    }
}
