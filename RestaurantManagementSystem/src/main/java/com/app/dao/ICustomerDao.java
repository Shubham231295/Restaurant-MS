package com.app.dao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.pojos.Customer;

public interface ICustomerDao extends JpaRepository<Customer, Integer> {
	
	@Query("select c from Customer c where c.username=:username and c.password=:password")
	Customer validateCustomer(String username, String password);

	/*
	 * @Query("select new CustomerMembership(c.customer_id, COUNT(c.customer_id)) from Customer c"
	 * ) List<Customer> countTotalCustomers();
	 */

	
}
