package com.app.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ResponseDTO;
import com.app.dto.ResponseListDTO;
import com.app.pojos.Order;
import com.app.service.IOrderService;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins ="http://localhost:4200")
public class OrderController {
	
	@Autowired
	private IOrderService service;
	
	public OrderController() {
		System.out.println("in ctor of "+getClass().getName());
	}
	
	//REST API to get all the orders
	@GetMapping
	public ResponseEntity<?> getOrders()
	{
		System.out.println("in list of all orders");
		List<Order> orders = service.getAllOrders();
		if(orders.isEmpty())
		{
			return new ResponseEntity<>(new ResponseDTO("error","Order list is Empty." ,null),HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(new ResponseDTO("success", "List of all Orders", orders), HttpStatus.OK);
	}
	
	//request handling to register a new customer : POST
	@PostMapping
	public ResponseEntity<?> newOrders(@RequestBody Order o)
	{
		System.out.println("in register new customer "+o);
		try {
			o.setTotal_amount(o.getPrice()*o.getQuantity());
			Order order = service.newOrder(o);
			
			
			return new ResponseEntity<>(new ResponseDTO("success", "New Orders", order), HttpStatus.OK);
		}catch (RuntimeException e) {
			e.printStackTrace();
			return new ResponseEntity<>(new ResponseDTO("error","New Orders insertion failed." ,null),HttpStatus.NOT_FOUND);
		}
	}
	
		
	//REST API to find the details of customer by ID
	@GetMapping("/{details}")
	public ResponseEntity<?> getOrderDetails(@PathVariable Integer details)
	{
		System.out.println("in get csutomer details "+details);
		Optional<Order> oDetails= service.getOrderDetailsById(details);
		//in case of invalid name : HTTP 404
		if(oDetails.isPresent())
			return new ResponseEntity<>(new ResponseDTO("success", "Get order details by Order ID", oDetails.get()), HttpStatus.OK);
		//valid name : HTTP 200, marshalled menu details
		return new ResponseEntity<>(new ResponseDTO("error","Order details fetching failed." ,null),HttpStatus.NOT_FOUND);
	}
	
	//REST API to find the cart items by menu_id
			@GetMapping("/by_cust_id/{customer_id}")
			public ResponseEntity<?> getCustomerById(@PathVariable Integer customer_id) {
				
				List<Order> optional = service.getOrderByCustomerIdDetails(customer_id);
				
					return new ResponseEntity<>(new ResponseListDTO("success","Details Found",optional),HttpStatus.OK);
				// invalid id
				//return new ResponseEntity<>(new ResponseDTO("error","Menu id not Found",null),HttpStatus.NOT_FOUND);

			}
		
			@DeleteMapping("/by_cust_id/{customer_id}")
			public ResponseEntity<?> deleteCustomerByIdDetails(@PathVariable  Integer customer_id) {
				System.out.println("in delete cart items " + customer_id);
				// check if user exists
				
				service.deleteOrderByCustomerIdDetails(customer_id);
				return new ResponseEntity<>(new ResponseDTO("success","Cart Item deleted with Customer ID " + customer_id,null), HttpStatus.OK);
				
			}
	

}
