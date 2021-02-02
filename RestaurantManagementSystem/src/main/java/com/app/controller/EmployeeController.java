package com.app.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.Login;
import com.app.dto.ResponseDTO;
import com.app.pojos.Employee;
import com.app.service.IEmployeeService;

@RestController
@RequestMapping("/employees")
@CrossOrigin(origins ="http://localhost:4200")
public class EmployeeController {
	//dependency 
	@Autowired
	private IEmployeeService service;
	
	public EmployeeController() {
		System.out.println("in ctor of "+getClass().getName());
	}
	
	//RESTFUL end point of API provider
	@GetMapping
	public ResponseEntity<?> listAllEmployees()
	{
		System.out.println("in list of all employees ");
		List<Employee> employees = service.getAllEmployees();
		if(employees.isEmpty())
		{
			return new ResponseEntity<>(new ResponseDTO("error","Employee list fetching failed" ,null),HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(new ResponseDTO("success", "List of All Employees", employees),HttpStatus.OK);		
	}
	
	//request handling to register a new product : POST
	@PostMapping
	public ResponseEntity<?> registerEmployee(@RequestBody Employee e)
	{
		System.out.println("in register new Employee "+e);
		try {
			Employee savedEmployee = service.registerEmployeeDetails(e);
			return new ResponseEntity<>(new ResponseDTO("success", "New Employee Registered", savedEmployee), HttpStatus.OK);
		}catch (RuntimeException ex) {
			ex.printStackTrace();
			return new ResponseEntity<>(new ResponseDTO("error","Employee Registration failed" ,null),HttpStatus.NOT_FOUND);
		}
	}	
	//req handling method to update existing Employee
	@PutMapping("/{empId}")
	public ResponseEntity<?> updateEmployeeDetails(@PathVariable int empId, @RequestBody Employee e)
	{
		System.out.println("in update "+empId+" "+e);
		try {
			Employee updatedDetails = service.updateEmployeeDetails(empId, e);
			return new ResponseEntity<>(new ResponseDTO("success", "Updated Existing Employee", updatedDetails),HttpStatus.OK);
		}catch (RuntimeException ex) {
			ex.printStackTrace();
			return new ResponseEntity<>(new ResponseDTO("error","Employee Updation failed" ,null),HttpStatus.NOT_FOUND);
		}
	}
	
	//req handling method to delete existing employee
	@DeleteMapping("/{eid}")
	public ResponseEntity<?> deleteEmployee(@PathVariable int eid)
	{
		System.out.println("in del customer "+eid);
		// check if user exists
		Optional<Employee> optional = service.findById(eid);
		if (optional.isPresent()) {
			service.deleteById(eid);
			return new ResponseEntity<>(new ResponseDTO("success","Employee deleted with ID " + eid,null), HttpStatus.OK);
		} else
			return new ResponseEntity<>(new ResponseDTO("error","Employee deletion failed" ,null), HttpStatus.NOT_ACCEPTABLE);		
	}
	
	//REST API for employee login
	@PostMapping("/login")
	public ResponseEntity<?> validateEmployeeCredentials(@RequestBody Login login)
	{
		System.out.println("in login "+ login.getUsername());
		System.out.println("in login "+ login.getPassword());
		Employee e=service.validateEmployee(login.getUsername(), login.getPassword());
		if(e==null)
		{
			System.out.println("in login null return ");
			return new ResponseEntity<>(new ResponseDTO("error","Employee Login failed" ,null),HttpStatus.NOT_FOUND);
		}else
		{
			System.out.println("in login credentials return ");
			return new ResponseEntity<>(new ResponseDTO("success", "Successfull Employee Login", e),HttpStatus.OK);
		}
	}
	
	//REST API for employee total count
	@GetMapping("/count")
	public ResponseEntity<?> countAllEmployees()
	{
		System.out.println("in count of all Employees");
		Long employees = service.getCountOfEmployees();
		
		return new ResponseEntity<>(new ResponseDTO("success", "Count of all Employees", employees),HttpStatus.OK);
	}
	
	//REST API to find the employee details by ID
	@GetMapping("/{details}")
	public ResponseEntity<?> getEmployeeDetails(@PathVariable Integer details)
	{
		System.out.println("in get employee details "+details);
		Optional<Employee> eDetails = service.getEmployeeDetails(details);
		//in case of invalid name : HTTP 404
		if(eDetails.isPresent())
			return new ResponseEntity<>(new ResponseDTO("success", "Get Employee details by Employee ID", eDetails.get()), HttpStatus.OK);
		//valid name : HTTP 200, marshalled menu details
		return new ResponseEntity<>(new ResponseDTO("error","Failed to get employee details by ID " ,null),HttpStatus.NOT_FOUND);
	}
	
}
