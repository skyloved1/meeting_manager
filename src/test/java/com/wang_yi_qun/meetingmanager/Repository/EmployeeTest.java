package com.wang_yi_qun.meetingmanager.Repository;

import com.wang_yi_qun.meetingmanager.Model.Employee;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class EmployeeTest {

    @Autowired
    private EmployeeRepository employeeRepository;

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
        Employee employee = new Employee(/* 初始化字段 */);
        employeeRepository.save(employee);
        System.out.println("Inserted Employee: " + employee);
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