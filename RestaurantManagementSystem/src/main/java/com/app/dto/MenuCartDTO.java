package com.app.dto;

import com.app.pojos.Cart;
import com.app.pojos.Menu;

public class MenuCartDTO {
	private Menu menu;
	private Cart cart;
	
	
	public MenuCartDTO() {
		super();
	}

	public MenuCartDTO(Menu menu, Cart cart) {
		super();
		this.menu = menu;
		this.cart = cart;
	}

	public Menu getMenu() {
		return menu;
	}


	public void setMenu(Menu menu) {
		this.menu = menu;
	}


	public Cart getCart() {
		return cart;
	}


	public void setCart(Cart cart) {
		this.cart = cart;
	}

		
	
	
	
	
	
	
	
	
	/*private int id;
	private int menu_id;
	private String mname;
	private double price;
	private double quantity;
	private int total_price;
	public MenuCartDTO(int id, int menu_id, String mname, double price, double quantity, int total_price) {
		super();
		this.id = id;
		this.menu_id = menu_id;
		this.mname = mname;
		this.price = price;
		this.quantity = quantity;
		this.total_price = total_price;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getMenu_id() {
		return menu_id;
	}
	public void setMenu_id(int menu_id) {
		this.menu_id = menu_id;
	}
	public String getMname() {
		return mname;
	}
	public void setMname(String mname) {
		this.mname = mname;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public double getQuantity() {
		return quantity;
	}
	public void setQuantity(double quantity) {
		this.quantity = quantity;
	}
	public int getTotal_price() {
		return total_price;
	}
	public void setTotal_price(int total_price) {
		this.total_price = total_price;
	}*/
		
	
	
}
