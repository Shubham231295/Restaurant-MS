package com.app.pojos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "customer_table")
public class Customer {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer customer_id;	
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer cart_id;
	@Column(length = 30)
	private String first_name;
	@Column(length = 30)
	private String Last_name;
	@Column(length = 300)
	private String Address;
	@Column(length = 40)
	private String city;
	@Column(length = 50)
	private String country;	
	private Integer zip;
	@Column(length = 11,unique = true)
	private Integer phone_no;
	@Column(length = 50,unique = true)
	private String username;
	@Column(length = 50,unique = true)
	private String password;
	@Column(length = 40)
	private String email;
	
	/*
	 * @OneToMany(fetch = FetchType.LAZY, mappedBy = "customer") private
	 * Set<ShoppingCart> shoppingCarts = new HashSet<>();
	 */
	
	public Customer() {
		System.out.println("in ctor of "+getClass().getName());;
	}

	
	

	public Customer(Integer customer_id, Integer cart_id, String first_name, String last_name, String address,
			String city, String country, Integer zip, Integer phone_no, String username, String password,
			String email) {
		super();
		this.customer_id = customer_id;
		this.cart_id = cart_id;
		this.first_name = first_name;
		Last_name = last_name;
		Address = address;
		this.city = city;
		this.country = country;
		this.zip = zip;
		this.phone_no = phone_no;
		this.username = username;
		this.password = password;
		this.email = email;
	}




	public Integer getCart_id() {
		return cart_id;
	}

	public void setCart_id(Integer cart_id) {
		this.cart_id = cart_id;
	}

	public Integer getCustomer_id() {
		return customer_id;
	}

	public void setCustomer_id(Integer customer_id) {
		this.customer_id = customer_id;
	}

	public String getFirst_name() {
		return first_name;
	}

	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}

	public String getLast_name() {
		return Last_name;
	}

	public void setLast_name(String last_name) {
		Last_name = last_name;
	}

	public String getAddress() {
		return Address;
	}

	public void setAddress(String address) {
		Address = address;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public Integer getZip() {
		return zip;
	}

	public void setZip(Integer zip) {
		this.zip = zip;
	}

	public Integer getPhone_no() {
		return phone_no;
	}

	public void setPhone_no(Integer phone_no) {
		this.phone_no = phone_no;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}




	@Override
	public String toString() {
		return "Customer [customer_id=" + customer_id + ", cart_id=" + cart_id + ", first_name=" + first_name
				+ ", Last_name=" + Last_name + ", Address=" + Address + ", city=" + city + ", country=" + country
				+ ", zip=" + zip + ", phone_no=" + phone_no + ", username=" + username + ", email=" + email + "]";
	}

	
	

	
	
	
	
	
	
}
