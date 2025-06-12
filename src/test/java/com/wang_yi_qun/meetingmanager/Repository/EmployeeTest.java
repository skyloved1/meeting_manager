package com.wang_yi_qun.meetingmanager.Repository;

import com.wang_yi_qun.meetingmanager.Model.Employee;
import com.wang_yi_qun.meetingmanager.Model.EmployeeRole;
import com.wang_yi_qun.meetingmanager.Model.EmployeeStatus;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootTest
public class EmployeeTest {

    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    void selectAll() {
        Iterable<Employee> employees = employeeRepository.findAll();
        employees.forEach(System.out::println);
    }

    @Test
    void selectById() {
        int id = 9; // 测试用固定 ID
        Employee employee = employeeRepository.findById(id).orElse(null);
        if (employee != null) {
            System.out.println(employee);
        } else {
            System.out.println("Employee not found with ID: " + id);
        }
    }

    @Test
    void insert() {
        Employee employee = new Employee("t2", "t2", "t2", "13060000000", "tes2t@test2.com", "1", EmployeeRole.EMPLOYEE, EmployeeStatus.UNVERIFIED);
        var optEmployee = employeeRepository.findByEmployeeName(employee.getEmployeeName());
        optEmployee.ifPresentOrElse(
                existingEmployee -> System.out.println("Employee already exists: " + existingEmployee),
                () -> employeeRepository.save(employee));
    }

    @Test
    void update() {
        Employee employee = new Employee(/* 初始化字段 */);
        if (employeeRepository.existsById(employee.getEmployeeID())) {
            employeeRepository.save(employee);
            System.out.println("Updated Employee: " + employee);
        } else {
            System.out.println("Employee not found with ID: " + employee.getEmployeeID());
        }
    }
}