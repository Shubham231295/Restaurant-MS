package com.app.pojos;

import javax.persistence.Id;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Table;

@Entity
@Table(name = "employee_table")
public class Employee {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer emp_id;
	@Column(length = 30)
	private String emp_first_name;
	@Column(length = 30)
	private String emp_last_name;
	@Column(length = 10,unique = true)
	private Integer emp_phone_no;
	@Column(length = 50,unique = true)
	private String username;
	@Column(length = 50,unique = true)
	private String password;
	@Column(length = 50)
	private String role;
	@Column(length = 6)
	private Boolean status=false;
	
	
	
	public Boolean getStatus() {
		return status;
	}
	public void setStatus(Boolean status) {
		this.status = status;
	}
	public Integer getEmp_id() {
		return emp_id;
	}
	public void setEmp_id(Integer emp_id) {
		this.emp_id = emp_id;
	}
	public String getEmp_first_name() {
		return emp_first_name;
	}
	public void setEmp_first_name(String emp_first_name) {
		this.emp_first_name = emp_first_name;
	}
	public String getEmp_last_name() {
		return emp_last_name;
	}
	public void setEmp_last_name(String emp_last_name) {
		this.emp_last_name = emp_last_name;
	}
	public Integer getEmp_phone_no() {
		return emp_phone_no;
	}
	public void setEmp_phone_no(Integer emp_phone_no) {
		this.emp_phone_no = emp_phone_no;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
			
}
