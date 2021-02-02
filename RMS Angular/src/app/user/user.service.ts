import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url= 'http://localhost:8080/customers/'

  constructor(
  private httpClient: HttpClient) 
  { }

  getUserid( customer_id){
    return this.httpClient.get(this.url+ "/" +customer_id)
  }

  updateCustomer(customer_id,first_name:string,last_name:string,city:string,country:string,zip:number,phone_no:number,username:string,password:string,address:string,email:string){
    const body ={
      customer_id:customer_id,
      first_name:first_name,
      last_name:last_name,
      city:city,
      country:country,
      zip:zip,
      phone_no:phone_no,
      username:username,
      password:password,
      address:address,
      email:email
    }
    return this.httpClient.put(this.url+ "/" + customer_id,body)
  }

  sendMail(customer_id){
   const body={ }
    return this.httpClient.post(this.url+"email/"+customer_id,body)
  }

  

}
 