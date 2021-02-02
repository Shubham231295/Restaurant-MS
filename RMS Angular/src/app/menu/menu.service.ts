import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  url= 'http://localhost:8080/menus'
 
  constructor( 
  private httpClient: HttpClient) 
  { }
 
  getMenus(){ 
    return this.httpClient.get(this.url)
  }

}
