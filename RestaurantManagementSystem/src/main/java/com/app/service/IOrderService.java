package com.app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.app.pojos.Order;

public interface IOrderService {
	//get all the orders
	List<Order> getAllOrders();
	
	//get order by details
	Optional<Order> getOrderDetailsById(int id);
	
	//add new orders
	Order newOrder(Order transPOJO);
	
	@Query("select o from Order o where o.customer_id=:customer_id")
	List<Order> getOrderByCustomerIdDetails(Integer customer_id);
	
	@Modifying
	@Transactional
	@Query(value="delete from Order o where o.customer_id= ?1")
	void deleteOrderByCustomerIdDetails(Integer customer_id);
	
}
