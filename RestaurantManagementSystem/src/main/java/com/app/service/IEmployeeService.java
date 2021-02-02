package com.app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;

import com.app.pojos.Employee;

public interface IEmployeeService {
	//list all employees
	List<Employee> getAllEmployees();
	
	//register(add) new Employee
	Employee registerEmployeeDetails(Employee transientPOJO);	
	
	//update Employee details
	Employee updateEmployeeDetails(int empId,Employee detachedPOJO);
	
	@Query("select e from Employee e where e.username=:username and e.password=:password")
	Employee validateEmployee(String username, String password);
	
	Long getCountOfEmployees();
	
	//get employee details by ID
	Optional<Employee> getEmployeeDetails(Integer eId);

	Optional<Employee> findById(int eid);

	void deleteById(int eid);
}
