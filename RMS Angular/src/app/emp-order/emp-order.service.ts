import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmpOrderService {
 
  url='http://localhost:8080/orders'

  constructor(
  private httpClient: HttpClient  ) { }
 
  deleteOrder(customer_id){
    return this.httpClient.delete(this.url +"/by_cust_id/"+customer_id)
  }

  getOrder(){ 
    return this.httpClient.get(this.url)
  } 

  getOrderId(customer_id){
    this.url= "http://localhost:8080/orders"
    return this.httpClient.get(this.url+"/by_cust_id/"+customer_id)

  }
}