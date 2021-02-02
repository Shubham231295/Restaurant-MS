package com.app.service;

import java.util.List;
import java.util.Optional;

import com.app.pojos.Menu;

public interface IMenuService {
	// list all Menu
	List<Menu> getAllMenus();
	//get product by name
	Optional<Menu> getMenuDetails(Integer mId);
	//add new menu details
	Menu addMenuDetails(Menu transientPOJO);
	//update menu details
	Menu updateMenuDetails(int menuId,Menu detachedPOJO);
	//delete existing details
	Optional<Menu> findById(int mid);
	void deleteById(int mid);
	
	
}
