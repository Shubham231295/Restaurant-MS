package com.app.pojos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "order_table")
public class Order {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)	
	private Integer id;			
	
	@Column(length = 40)
	private Integer customer_id;
	
	@Column(length = 40)
	private Integer menu_id;
	
	@Column(length = 60)
	private String mname;
	
	@Column(length = 10)
	private float price;
	
	@Column(length = 20)
	private float total_amount;
	
	@Column(length = 10)
	private Integer quantity;
	
	@Column(length = 6)
	private Boolean order_status=false;
	
		
	public Order() {
		System.out.println("in ctor of "+getClass().getName());
	}

	public Order(Integer id, Integer customer_id, Integer menu_id, String mname, float price, float total_amount,
			Integer quantity, Boolean order_status) {
		super();
		this.id = id;
		this.customer_id = customer_id;
		this.menu_id = menu_id;
		this.mname = mname;
		this.price = price;
		this.total_amount = total_amount;
		this.quantity = quantity;
		this.order_status = order_status;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Boolean getOrder_status() {
		return order_status;
	}

	public void setOrder_status(Boolean order_status) {
		this.order_status = order_status;
	}

	public Integer getCustomer_id() {
		return customer_id;
	}

	public void setCustomer_id(Integer customer_id) {
		this.customer_id = customer_id;
	}

	public Integer getMenu_id() {
		return menu_id;
	}

	public void setMenu_id(Integer menu_id) {
		this.menu_id = menu_id;
	}

	public String getMname() {
		return mname;
	}

	public void setMname(String mname) {
		this.mname = mname;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public float getTotal_amount() {
		return (this.getPrice()*this.getQuantity());
	}

	public void setTotal_amount(float total_amount) {
		this.total_amount = total_amount;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

}
