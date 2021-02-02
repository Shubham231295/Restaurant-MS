import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmpUserService {

  url= 'http://localhost:8080/customers/'

  constructor(
  private httpClient: HttpClient) 
  { }

  getUser(){
    return this.httpClient.get(this.url)
  }

  deleteUser(customer_id){
    return this.httpClient.delete(this.url+"/"+customer_id)
  }

  getCount(){
    return this.httpClient.get(this.url+"/count")
  }
}
