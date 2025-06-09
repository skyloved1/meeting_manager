package com.wang_yi_qun.meetingmanager.Repository;

import com.wang_yi_qun.meetingmanager.Model.Employee;
import org.springframework.data.repository.CrudRepository;

public interface EmployeeRepository extends CrudRepository<Employee, Integer> {
}
