package com.wang_yi_qun.meetingmanager.Api;

import com.wang_yi_qun.meetingmanager.Model.Employee;
import com.wang_yi_qun.meetingmanager.Repository.EmployeeRepository;
import com.wang_yi_qun.meetingmanager.Util.PasswordConverter;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RequestMapping("/api/registration")
@AllArgsConstructor
public class Registration {
    private EmployeeRepository employeeRepository;
    private PasswordConverter passwordConverter;

    @PostMapping
    void register(@RequestParam("username") String username,
                  @RequestParam("password") String password) {
        Employee employee = new Employee();
        employee.setUsername(username);
        employee.setPassword(passwordConverter.convert(password));
        employeeRepository.save(employee);
    }
}
