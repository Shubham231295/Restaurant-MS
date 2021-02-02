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

import com.app.dto.ResponseDTO;
import com.app.pojos.Menu;
import com.app.service.IMenuService;

@RestController	//=AController at class level + @Response body annotation added on ret types of all req handling methods
@RequestMapping("/menus")
@CrossOrigin(origins ="http://localhost:4200")
public class MenuController {
	//dependency
	@Autowired
	private IMenuService service;
	
	public MenuController() {		
		System.out.println("in ctor of "+getClass().getName());
	}
	//RESTFul end point or API end point or API provider 
	@GetMapping
	public ResponseEntity<?> listAllMenus()
	{
		System.out.println("in list of all Menus");
		//invoke service layer's method : controller --> service impl (p) --> JPA's repo's impl class(SC)
		List<Menu> menus = service.getAllMenus();
		if(menus.isEmpty()) {
			//empty product list : set sts code : HTTP 204 (no contents)
			return new ResponseEntity<>(new ResponseDTO("error","Menu List has no contents." ,null),HttpStatus.NO_CONTENT); 
		}
		//in case of non empty list : OK, send the list
		return new ResponseEntity<>(new ResponseDTO("success", "List of All Menus", menus), HttpStatus.OK);		
	}
	//get menu details by its id : supplied by clnt using path var
	@GetMapping("/{details}")
	public ResponseEntity<?> getMenuDetails(@PathVariable Integer details)
	{
		System.out.println("in get prod details "+details);
		Optional<Menu> menuDetails = service.getMenuDetails(details);
		//in case of invalid name : HTTP 404
		if(menuDetails.isPresent())
			return new ResponseEntity<>(new ResponseDTO("success", "Get menu details by Menu ID", menuDetails.get()), HttpStatus.OK);
		//valid name : HTTP 200, marshalled menu details
		return new ResponseEntity<>(new ResponseDTO("error","Menu details not Found BY ID"+ details ,null),HttpStatus.NOT_FOUND);
	}
	//req handling method to create a new product : post
	@PostMapping
	public ResponseEntity<?> addMenu(@RequestBody Menu m)
	{
		System.out.println("in add product "+m);
		try {
			Menu savedMenu = service.addMenuDetails(m);
			return new ResponseEntity<>(new ResponseDTO("success", "Addition of New Menu", savedMenu), HttpStatus.OK);
		}catch (RuntimeException e) {
			e.printStackTrace();
			return new ResponseEntity<>(new ResponseDTO("error","Menu addition failed." ,null),HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	//req handling method to update existing product
	@PutMapping("/{menuId}")
	public ResponseEntity<?> updateMenuDetails(@PathVariable int menuId, @RequestBody Menu m)
	{
		System.out.println("in update "+menuId+" "+m);
		try {
			Menu updatedDetails = service.updateMenuDetails(menuId, m);
			return new ResponseEntity<>(new ResponseDTO("success", "Menu Updated successfully", updatedDetails),HttpStatus.OK);
		}catch (RuntimeException e) {
			e.printStackTrace();
			return new ResponseEntity<>(new ResponseDTO("error","Menu Updation Failed." ,null),HttpStatus.NOT_FOUND);
		}
		
	}
	//req handling method to delete existing menu
	@DeleteMapping("/{mid}")
	public ResponseEntity<?> deleteEmployee(@PathVariable int mid)
	{
		System.out.println("in del menu "+mid);
		// check if user exists
		Optional<Menu> optional = service.findById(mid);
		if (optional.isPresent()) {
			service.deleteById(mid);
			return new ResponseEntity<>(new ResponseDTO("success","Menu deleted with ID " + mid,null), HttpStatus.OK);
		} else
			return new ResponseEntity<>(new ResponseDTO("error","Employee deletion failed" ,null), HttpStatus.NOT_ACCEPTABLE);		
	}

}
