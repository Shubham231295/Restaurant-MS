import { EmpMenuService } from './../emp-menu.service';
import { MenuService } from './../../menu/menu.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html', 
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {

  menus = [{}]
 
  constructor(
    private router: Router,
    private empMenuService: EmpMenuService) { }

  ngOnInit(): void {
    this.loadMenus()
  }

  loadMenus(){
    this.empMenuService
    .getMenus()
    .subscribe(response => {
      //console.log(response)
      if (response['status'] = 'success'){
        this.menus = response['data']
      }else{
        console.log(response['error'])
      }
 
    }) 
  }
 
  onEdit(menu){ 
    this.router.navigate(['/adminHome/emp-menu/menu-add'], {queryParams: {id: menu['menu_id']}})
  } 

  onDelete(menu){
    console.log(menu['menu_id'])
    this.empMenuService.deleteMenu(menu['menu_id'])
    .subscribe(response => {
      // console.log('hello'+response)
      if(response['status'] == 'success'){
        this.loadMenus()
      }else{
        console.log('item not deleted')
      }
    })
  }

  addMenu(){
    this.router.navigate(['/adminHome/emp-menu/menu-add'])
  }

}
 