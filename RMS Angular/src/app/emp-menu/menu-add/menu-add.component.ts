import { EmpMenuService } from './../emp-menu.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-add',
  templateUrl: './menu-add.component.html',
  styleUrls: ['./menu-add.component.css']
})
export class MenuAddComponent implements OnInit {

  mname = ''
  description = ''
  price = 0
  category = '' 
 
  menu = null

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private empMenuService: EmpMenuService) { }
 
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.queryParams['id']
    if (id){
      this.empMenuService
      .getMenusDetails(id)
      .subscribe(response => {
        if (response['status'] == 'success'){
          const menus = response['data']
          if (Object.keys(menus).length > 0){
            console.log(menus)          
            this.menu = menus;
            this.mname = menus['mname']
            this.description = menus['description']
            this.price = menus['price']
            this.category = menus['menu_category']
          }
        } 
      })
    }
  } 
    
  onUpdate(){ 
    //console.log('')
    if (this.menu){
      this.empMenuService
      .updateMenu(this.menu['menu_id'], this.mname, this.description, this.category,this.price)
      .subscribe(response => {
        if (response['status'] == 'success'){
          this.router.navigate(['/adminHome/emp-menu/menu-list'])
        }
      })
    }else{
      this.empMenuService
      .insertMenu(this.description, this.category, this.price, this.mname)
      .subscribe(response => {
        if (response['status'] == 'success'){
          //console.log(response)
          this.router.navigate(['/adminHome/emp-menu/menu-list'])
        }
      })
    }
  } 

  onCancel(){
    this.router.navigate(['/adminHome/emp-menu/menu-list'])
  }
}

