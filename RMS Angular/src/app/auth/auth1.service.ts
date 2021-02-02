import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Auth1Service {
  
  url = 'http://localhost:8080/employees'

  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) { }

  adminlogin(username: string, password: string){
    const body = {
      username: username,
      password: password
    }
    return this.httpClient.post(this.url + '/login', body)
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (sessionStorage['emp_first_name']) {
      return true
    }else{
      this.router.navigate(['/auth/login']) 
      return false
    }
  }
}
