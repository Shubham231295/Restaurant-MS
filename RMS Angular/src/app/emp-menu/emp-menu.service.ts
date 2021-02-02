import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmpMenuService { 

  url= 'http://localhost:8080/menus'

  constructor( 
  private httpClient: HttpClient) 
  { }
 
  getMenus(){ 
    return this.httpClient.get(this.url)
  }

  getMenusDetails(menu_id){
    return this.httpClient.get(this.url+ "/" + menu_id)
  }

  updateMenu(menu_id, mname: string, description: string, menu_category: string, price: number){
    const body ={
      menu_id:menu_id,
      mname:mname,
      description: description,
      menu_category: menu_category,
      price: price,
    }

    return this.httpClient.put(this.url+ "/" + menu_id,body)
  }

  insertMenu(description: string, menu_category: string, price: number, mname: string){
    const body ={
      mname:mname,
      description: description,
      price: price,
      menu_category: menu_category
    }

    return this.httpClient.post(this.url ,body)   
  }

  deleteMenu(menu_id){
    return this.httpClient.delete(this.url+"/"+menu_id)
  }
}
