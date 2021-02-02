package com.app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.IOrderDao;
import com.app.pojos.Order;

@Service
@Transactional
public class OrderServiceImpl implements IOrderService {

	@Autowired
	private IOrderDao dao;
	
	@Override
	public List<Order> getAllOrders() {
		// TODO Auto-generated method stub
		return dao.findAll();
	}

	@Override
	public Optional<Order> getOrderDetailsById(int id) {
		// TODO Auto-generated method stub
		return dao.findById(id);
	}

	@Override
	public Order newOrder(Order transPOJO) {
		// TODO Auto-generated method stub
		return dao.save(transPOJO);
	}

	@Override
	public List<Order> getOrderByCustomerIdDetails(Integer customer_id) {
		// TODO Auto-generated method stub
		return dao.getOrderByCustomerIdDetails(customer_id);
	}

	@Override
	public void deleteOrderByCustomerIdDetails(Integer customer_id) {
		// TODO Auto-generated method stub	
		dao.deleteOrderByCustomerIdDetails(customer_id);
	}
	
	
}
