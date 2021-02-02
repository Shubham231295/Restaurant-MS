import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class AuthService implements CanActivate {

  url ='http://localhost:8080/customers'

  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) { }

  login(username: string, password: string) {
    const body = {
      username: username,
      password: password
    }

    return this.httpClient.post(this.url + '/login', body)
  }


  signup(first_name : string, last_name : string, country : string, city : string, address : string, zip : number,phone_no : number, email: string, username : string, password : string) {
    const body = {
      first_name : first_name,
      last_name : last_name,
      country : country,
      city : city,
      address:address,
      zip : zip,
      phone_no:phone_no,
      email:email,
      username : username,
      password : password
    }
    return this.httpClient.post(this.url, body)
  } 
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (sessionStorage['first_name']) {
      return true
    }else{
      this.router.navigate(['/auth/login']) 
      return false
    }
  }

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  //   if (!sessionStorage['first_name']||!sessionStorage['emp_first_name']) {
  //     // user is already logged in
  //     // launch the component
  //     this.router.navigate(['/login'])
  //     return false;
  
  //   }
  //     if (sessionStorage['role'] == 'Manager') {
  //       this.router.navigate(['/home/dashboard'])
  //       return false
  //     }
  //   }
}
