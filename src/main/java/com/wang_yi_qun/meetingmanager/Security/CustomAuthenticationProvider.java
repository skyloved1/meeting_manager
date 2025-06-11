package com.wang_yi_qun.meetingmanager.Security;

import com.wang_yi_qun.meetingmanager.Repository.EmployeeRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class CustomAuthenticationProvider implements AuthenticationProvider {

    private final EmployeeRepository employeeRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username = authentication.getName();
        String password = authentication.getCredentials().toString();

        // 从数据库中查询用户
        var  optionalEmployee = employeeRepository.findByUsername(username);
        if(optionalEmployee.isEmpty()) {
            throw new BadCredentialsException("Invalid username or password");
        }

        // 检查用户是否启用
        if (optionalEmployee.get().getStatus() == 0) { // 假设 status 为 0 表示未启用
            throw new BadCredentialsException("User is not enabled");
        }
//TODO 暂时取消加密
        // 验证密码
//        if (!passwordEncoder.matches(password, employee.getPassword())) {
//            throw new BadCredentialsException("Wrong password");
//        }
        if(!password.equals(optionalEmployee.get().getPassword())) {
            throw new BadCredentialsException("Wrong password");
        }
        optionalEmployee.get().setStatus(2);
        employeeRepository.save(optionalEmployee.get());
        // 返回认证后的对象
        return new UsernamePasswordAuthenticationToken(optionalEmployee.get(), password, optionalEmployee.get().getAuthorities());
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
    }
}