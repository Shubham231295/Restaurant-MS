import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' 
})
export class OrderService { 

  url= "http://localhost:8080/orders"
 
  constructor(
    private httpClient: HttpClient) { }

    addtoOrder(customer_id:number,menu_id:number,mname:number,price:number,total_amount:number,quantity:number){
      const body={
        customer_id: customer_id,
        menu_id: menu_id,
        mname: mname,
        price: price,
        total_amount: total_amount,
        quantity: quantity
      }
      return this.httpClient.post(this.url,body)
    }

    getOrderId(customer_id){ 
      return this.httpClient.get(this.url+"/by_cust_id/"+customer_id)
    }

}
