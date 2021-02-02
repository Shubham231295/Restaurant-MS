package com.app.custom_excs;

public class CustomerNotFoundEception extends RuntimeException {
	public CustomerNotFoundEception(String mesg) {
		super(mesg);
	}
}
