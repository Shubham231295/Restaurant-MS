package com.app.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.Menu;

public interface IMenuDao extends JpaRepository<Menu,Integer>{
	//search by menu name
	Optional<Menu> findByMname(String mName);
	
	
	
}
