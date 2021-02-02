package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.app.pojos.Order;

public interface IOrderDao extends JpaRepository<Order, Integer>{
	
	@Query("select o from Order o where o.customer_id=:customer_id")
	List<Order> getOrderByCustomerIdDetails(Integer customer_id);
	
	@Modifying
	@Transactional
	@Query(value="delete from Order o where o.customer_id= ?1")
	void deleteOrderByCustomerIdDetails(Integer customer_id);
	
}
