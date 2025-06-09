package com.wang_yi_qun.meetingmanager.Repository;

import com.wang_yi_qun.meetingmanager.Model.Employee;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface EmployeeRepository extends CrudRepository<Employee, Integer> {
   Optional<Employee> findByEmployeeName(String employeeName);
}
