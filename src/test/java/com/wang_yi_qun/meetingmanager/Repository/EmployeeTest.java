package com.wang_yi_qun.meetingmanager.Repository;

import com.wang_yi_qun.meetingmanager.Model.Employee;
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
        Employee employee = new Employee("testUser", "testUser", passwordEncoder.encode("test"), "13000000000", "test@test.com", "1", 2, 2);
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