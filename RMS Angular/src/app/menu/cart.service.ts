import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  url= 'http://localhost:8080/carts'

  constructor( 
  private httpClient: HttpClient) 
  { }
  
  getCartItemId(customer_id){ 
    return this.httpClient.get(this.url+"/by_cust_id/"+customer_id)
  } 

  addCartItem(customer_id,menu_id,mname,price,quantity){ 

    const body={
      customer_id:customer_id,
      menu_id:menu_id,
      mname:mname,
      price:price,
      quantity:quantity
    } 
    return this.httpClient.post(this.url,body)
  }  

  deleteCart(customer_id){ 
    return this.httpClient.delete(this.url+"/by_cust_id/"+customer_id)
  } 
 
  deleteCartItem(id){
    return this.httpClient.delete(this.url+"/"+id)
  }

  updateCartItem(id,customer_id,menu_id,mname,quantity,price){ 
    const body ={
      id:id,
      customer_id:customer_id,
      menu_id:menu_id,
      mname:mname,
      price:price,
      quantity:quantity
    }
    return this.httpClient.put(this.url+"/"+id, body)
  }

}
