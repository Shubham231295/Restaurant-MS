package com.app.custom_excs;

public class EmployeeNotFoundException extends RuntimeException {
	public EmployeeNotFoundException(String mesg) {
		super(mesg);
	}
}
