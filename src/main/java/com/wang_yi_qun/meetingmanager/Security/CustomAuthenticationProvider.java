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

        // 检查用户状态
        switch (optionalEmployee.get().getStatus()) {
            case VERIFIED:
                throw new BadCredentialsException("Account not activated");
            case UNVERIFIED:
                throw new BadCredentialsException("Account is under review");
            case VERIFYING:
                break;
            default:
                throw new BadCredentialsException("Unknown account status");
        }

        //TODO 暂时取消加密
        // 验证密码
//        if (!passwordEncoder.matches(password, employee.getPassword())) {
//            throw new BadCredentialsException("Wrong password");
//        }
        if(!password.equals(optionalEmployee.get().getPassword())) {
            throw new BadCredentialsException("Wrong password");
        }
        employeeRepository.save(optionalEmployee.get());
        // 返回认证后的对象
        return new UsernamePasswordAuthenticationToken(optionalEmployee.get(), password, optionalEmployee.get().getAuthorities());
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
    }
}