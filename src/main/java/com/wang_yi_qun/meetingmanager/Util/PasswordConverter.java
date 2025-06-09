package com.wang_yi_qun.meetingmanager.Util;

import com.wang_yi_qun.meetingmanager.Model.Employee;
import org.springframework.context.annotation.Bean;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class PasswordConverter implements Converter<Employee, Employee> {
    private PasswordEncoder passwordEncoder;

    public PasswordConverter(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Employee convert(Employee source) {
        source.setPassword(passwordEncoder.encode(source.getPassword()));
        return source;
    }



}
