package com.app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_excs.CustomerNotFoundEception;
import com.app.dao.ICustomerDao;
import com.app.pojos.Customer;

@Service
@Transactional
public class CustomerServiceImpl implements ICustomerService {
	// dependency
	@Autowired
	private ICustomerDao dao;
	
	@Override
	public List<Customer> getAllCustomers() {
		System.out.println("dao impl class "+getClass().getName() );
		return dao.findAll();			
	}

	@Override
	public Customer registerCustomerDetails(Customer transientPOJO) {
		// TODO Auto-generated method stub
		return dao.save(transientPOJO);
	}

	@Override
	public Customer updateCustomerDetails(int customerId, Customer c1) {
		// chk if customer exists
		Optional<Customer> c = dao.findById(customerId);
		if(c.isPresent())
		{
			Customer customer = c.get();
			customer.setFirst_name(c1.getFirst_name());
			customer.setLast_name(c1.getLast_name());
			customer.setUsername(c1.getUsername());
			customer.setPassword(c1.getPassword());
			customer.setAddress(c1.getAddress());
			customer.setCity(c1.getCity());
			customer.setCountry(c1.getCountry());
			customer.setZip(c1.getZip());
			customer.setPhone_no(c1.getPhone_no());
			customer.setEmail(c1.getEmail());
			return customer;
		}
		throw new CustomerNotFoundEception("Invalid Customer ID");		
	}
	
	@Override
	public Customer validateCustomer(String username, String password) {
		// TODO Auto-generated method stub
		return dao.validateCustomer(username, password);
	}

	@Override
	public Long getCountOfCustomers() {
		// TODO Auto-generated method stub
		return dao.count();
	}

	

	@Override
	public Optional<Customer> findById(int cid) {
		// TODO Auto-generated method stub
		return dao.findById(cid);
	}

	@Override
	public void deleteById(int cid) {
		// TODO Auto-generated method stub
		dao.deleteById(cid);
		
	}

	@Override
	public Optional<Customer> getCustomerDetails(Integer cId) {
		// TODO Auto-generated method stub
		return dao.findById(cId);
	}
	
		

}
