package com.wang_yi_qun.meetingmanager.Api;

import com.wang_yi_qun.meetingmanager.Model.Employee;
import com.wang_yi_qun.meetingmanager.Model.EmployeeRole;
import com.wang_yi_qun.meetingmanager.Model.EmployeeStatus;
import com.wang_yi_qun.meetingmanager.Repository.EmployeeRepository;
import com.wang_yi_qun.meetingmanager.Util.PasswordConverter;
import lombok.AllArgsConstructor;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping(value = "/api/registration",produces = "application/json")
@AllArgsConstructor
@RestController
public class Registration {
    private EmployeeRepository employeeRepository;
    private PasswordConverter passwordConverter;

    @PostMapping
    public  ResponseEntity<String> register(
            @RequestParam("employeeName") String employeeName,
            @RequestParam("phone")String phone,
            @RequestParam("email") String email,
            @RequestParam("departmentID") int departmentID,
            @RequestParam("role") EmployeeRole role,
            @RequestParam("status") EmployeeStatus status,
            @RequestParam("username") String username,
            @RequestParam("password") String password) {
        final var optEmployee= employeeRepository.findByEmployeeName(employeeName);
        final var json = new JSONObject();
        if(optEmployee.isPresent()) {
            json.put("status", HttpStatus.CONFLICT);
            json.put("message", "Employee:" + optEmployee.get().getUsername() + "already exists . Didn't create new employee");
            return ResponseEntity.badRequest().body(json.toString());
        }
        else{
            Employee employee = new Employee(employeeName,username,password,phone,email,departmentID,role,status);
            employeeRepository.save(employee);
            json.put("status", HttpStatus.CREATED);
            json.put("message", "Employee:" + employee.getUsername() + " created successfully");
        }
        return ResponseEntity.ok().body(json.toString());
    }
}
