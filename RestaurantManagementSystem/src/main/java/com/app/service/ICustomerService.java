package com.app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;

import com.app.pojos.Customer;

public interface ICustomerService {
	// list all the Customers
	List<Customer> getAllCustomers();
	
	//register(add) new customer
	Customer registerCustomerDetails(Customer transientPOJO);
	
	//update customer details
	Customer updateCustomerDetails(int customerId, Customer detachedPOJO);
	
	//Login customer validation
	@Query("select c from Customer c where c.username=:username and c.password=:password")
	Customer validateCustomer(String username, String password);
	
	//delete existing employee
	//Optional<Customer> deleteCustomer(Integer customerId);
	
	Long getCountOfCustomers();
	
	//get customer details by ID
	Optional<Customer> getCustomerDetails(Integer cId);

	Optional<Customer> findById(int cid);

	void deleteById(int cid);
	
	
	
	
}
