package com.app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_excs.MenuNotFoundException;
import com.app.dao.IMenuDao;
import com.app.pojos.Menu;

@Service
@Transactional
public class MenuServiceImpl implements IMenuService {
	//dependency
	@Autowired
	private IMenuDao dao;
	
	@Override
	public List<Menu> getAllMenus() {
		System.out.println("dao impl class "+getClass().getName());
		return dao.findAll();
	}

	@Override
	public Optional<Menu> getMenuDetails(Integer mId) {
		// TODO Auto-generated method stub
		return dao.findById(mId);
	}

	@Override
	public Menu addMenuDetails(Menu transientPOJO) {
		// TODO Auto-generated method stub
		return dao.save(transientPOJO);
	}

	@Override
	public Menu updateMenuDetails(int menuId, Menu m1) {
		// chk if product exists
		Optional<Menu> m = dao.findById(menuId);
		if(m.isPresent())
		{
			//m.get() : PERSISTENT
			//p1 : detached POJO : contains the updates sent by clnt
			//change the state of persistent POJO
			Menu menu = m.get();
			menu.setMname(m1.getMname());
			menu.setDescription(m1.getDescription());
			menu.setMenu_category(m1.getMenu_category());
			menu.setPrice(m1.getPrice());
			return menu;
		}
		//in case of no menu found : throw custom exception
		throw new MenuNotFoundException("Invalid Menu ID");
	}

	@Override
	public Optional<Menu> findById(int mid) {
		// TODO Auto-generated method stub
		return dao.findById(mid);
	}

	@Override
	public void deleteById(int mid) {
		// TODO Auto-generated method stub
		dao.deleteById(mid);
		
	}
}
