package com.app.custom_excs;

public class MenuNotFoundException extends RuntimeException {
	public MenuNotFoundException(String mesg) {
		super(mesg);
	}
	
}
