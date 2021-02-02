package com.app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_excs.EmployeeNotFoundException;
import com.app.dao.IEmployeeDao;
import com.app.pojos.Employee;

@Service
@Transactional
public class EmployeeServiceImpl implements IEmployeeService {
	//dependency
	@Autowired
	private IEmployeeDao dao;
	
	@Override
	public List<Employee> getAllEmployees() {
		System.out.println("service impl class "+getClass().getName());
		return dao.findAll();
	}

	@Override
	public Employee validateEmployee(String username, String password) {
		// TODO Auto-generated method stub
		return dao.validateEmployee(username, password);
	}

	@Override
	public Employee registerEmployeeDetails(Employee transientPOJO) {
		// TODO Auto-generated method stub
		return dao.save(transientPOJO);
	}	
	
	@Override
	public Optional<Employee> findById(int eid) {
		// TODO Auto-generated method stub
		return dao.findById(eid);
	}

	@Override
	public void deleteById(int eid) {
		// TODO Auto-generated method stub
		dao.deleteById(eid);
	}

	@Override
	public Employee updateEmployeeDetails(int empId, Employee e1) {
		Optional<Employee>  e = dao.findById(empId);
		if(e.isPresent())
		{
			Employee employee = e.get();
			employee.setEmp_first_name(e1.getEmp_first_name());
			employee.setEmp_last_name(e1.getEmp_last_name());
			employee.setEmp_phone_no(e1.getEmp_phone_no());
			employee.setUsername(e1.getUsername());
			employee.setPassword(e1.getPassword());
			employee.setRole(e1.getRole());
			employee.setStatus(e1.getStatus());
			return employee;
		}
		
		throw new EmployeeNotFoundException("Invalid Employee ID");
	}

	@Override
	public Long getCountOfEmployees() {
		// TODO Auto-generated method stub
		return dao.count();
	}

	@Override
	public Optional<Employee> getEmployeeDetails(Integer eId) {
		// TODO Auto-generated method stub
		return dao.findById(eId);
	}
	
	
	
}
