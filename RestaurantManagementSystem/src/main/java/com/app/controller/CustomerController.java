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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.Email;
import com.app.dto.Login;
import com.app.dto.ResponseDTO;
import com.app.pojos.Customer;
import com.app.service.ICustomerService;
import com.app.service.MailService;

@RestController
@RequestMapping("/customers")
@CrossOrigin(origins ="http://localhost:4200")
public class CustomerController {
	// dependency
	@Autowired
	private ICustomerService service;
	@Autowired
	private MailService mailService;
	
	
	public CustomerController()
	{
		System.out.println("in ctor of "+getClass().getName());
	}
	
	//RESTFul end point or API end point or API provider
	@GetMapping
	public ResponseEntity<?> listAllCustomers()
	{
		System.out.println("in list of all customers");
		List<Customer> customers = service.getAllCustomers();
		if(customers.isEmpty())
		{
			return new ResponseEntity<>(new ResponseDTO("error","Customer details list is Empty." ,null),HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(new ResponseDTO("success", "List of all Customers", customers), HttpStatus.OK);
	}
	
	//request handling to register a new customer : POST
	@PostMapping
	public ResponseEntity<?> registerCustomer(@RequestBody Customer c)
	{
		System.out.println("in register new customer "+c);
		try {
			Customer savedCustomer = service.registerCustomerDetails(c);
			return new ResponseEntity<>(new ResponseDTO("success", "Registered New Customer", savedCustomer), HttpStatus.OK);
		}catch (RuntimeException e) {
			e.printStackTrace();
			return new ResponseEntity<>(new ResponseDTO("error","New Customer registration failed." ,null),HttpStatus.NOT_FOUND);
		}
	}
	
	//req handling method to update existing customer
	@PutMapping("/{customerId}")
	public ResponseEntity<?> updateCustomerDetails(@PathVariable int customerId, @RequestBody Customer c)
	{
		System.out.println("in update "+customerId+ " " +c);
		try {
			Customer updatedDetails = service.updateCustomerDetails(customerId, c);
			return new ResponseEntity<>(new ResponseDTO("success", "Updated existing Customer", updatedDetails), HttpStatus.OK);
		}catch (RuntimeException e) {
			e.printStackTrace();
			return new ResponseEntity<>(new ResponseDTO("error","Customer Updation failed." ,null),HttpStatus.NOT_FOUND);
		}
	}	
	//req handling method to login to customer
	@PostMapping("/login")
	public ResponseEntity<?> validateCustomerCredentials(@RequestBody Login login)
	{
		System.out.println("in login "+ login.getUsername());
		System.out.println("in login "+ login.getPassword());
		Customer c=service.validateCustomer(login.getUsername(), login.getPassword());
		if(c==null)
		{
			System.out.println("in login null return ");
			return new ResponseEntity<>(new ResponseDTO("error","Customer Login failed" ,null),HttpStatus.NOT_FOUND);			
		}else
		{
			System.out.println("in login credentials return ");
			return new ResponseEntity<>(new ResponseDTO("success", "Successfull Customer Login", c),HttpStatus.OK);			
		}
	}
	
	//REST API to count total no of customers registered
	@GetMapping("/count")
	public ResponseEntity<?> countAllCustomers()
	{
		System.out.println("in count of all customers");
		Long customers = service.getCountOfCustomers();
		
		return new ResponseEntity<>(new ResponseDTO("success", "Count of all Customers", customers), HttpStatus.OK);
	}
	
	//req handling method to delete existing customer
	@DeleteMapping("/{cid}")
	public ResponseEntity<?> deleteCustomer(@PathVariable int cid)
	{
		System.out.println("in del customer "+cid);
		// check if user exists
		Optional<Customer> optional = service.findById(cid);
		if (optional.isPresent()) {
			service.deleteById(cid);
			return new ResponseEntity<>(new ResponseDTO("success","Customer deleted with ID " + cid,null), HttpStatus.OK);
		} else
			return new ResponseEntity<>(new ResponseDTO("error","Customer deletion failed" ,null), HttpStatus.NOT_ACCEPTABLE);		
	}
	
	//REST API to find the details of customer by ID
	@GetMapping("/{details}")
	public ResponseEntity<?> getCustomerDetails(@PathVariable Integer details)
	{
		System.out.println("in get csutomer details "+details);
		Optional<Customer> cDetails= service.getCustomerDetails(details);
		//in case of invalid name : HTTP 404
		if(cDetails.isPresent())
			return new ResponseEntity<>(new ResponseDTO("success", "Get Customer details by Customer ID", cDetails.get()), HttpStatus.OK);
		//valid name : HTTP 200, marshalled menu details
		return new ResponseEntity<>(new ResponseDTO("error","Customer details fetching failed." ,null),HttpStatus.NOT_FOUND);
	}
	
	
	@PostMapping("/email/{customer_id}")
	public ResponseEntity<?> sendEmail(@PathVariable Integer customer_id,Email email)
	{
		System.out.println(customer_id);
		Optional<Customer> optional = service.findById(customer_id);
		
		if(optional.isPresent())
		{
			Customer existingCust = optional.get();
			//Email email2 = new Email();
			email.setDestEmail(existingCust.getEmail());
			System.out.println(existingCust.getEmail());
			email.setSubject("Restaurant Order");
			email.setMsg("Your Order is placed");
			//email.setMsg("Your Order is Placed.");
			mailService.sendEmail(email);			
		}
		return new ResponseEntity<>(new ResponseDTO("success", "Successfully mail sent.", mailService), HttpStatus.OK);
	}
	
	
		
	
	
	
	
		
}
