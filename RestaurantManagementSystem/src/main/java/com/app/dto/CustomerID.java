package com.app.dto;

public class CustomerID {
	private Integer customer_id;

	public CustomerID(Integer customer_id) {
		super();
		this.customer_id = customer_id;
	}
	
	public CustomerID() {
		System.out.println("in getCustomerId of "+getClass().getName());
	}

	public Integer getCustomer_id() {
		return customer_id;
	}

	public void setCustomer_id(Integer customer_id) {
		this.customer_id = customer_id;
	}
	
	
	
}
