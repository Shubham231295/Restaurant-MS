import { Auth1Service } from './../auth1.service';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username =''
  password = ''
  
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService,
    private auth1Service: Auth1Service) 
    { }

  ngOnInit(): void {
  }

  onLogin(){
    if(this.username.length == 0 || this.password.length == 0){
      this.toastr.error('Please enter required field')
    }
    // else if (){
    //   this.toastr.error('Please enter password')
    //}
    else if(this.username.length <= 8){
      this.authService
      .login(this.username, this.password) 
      .subscribe(response => {
        console.log(HttpErrorResponse['status'])
        if (response['status'] == 'success'){ 
          // console.log(response)
            const data = response['data']        
              sessionStorage['first_name'] = data['first_name']
              sessionStorage['last_name'] = data['last_name'] 
              sessionStorage['customer_id'] = data['customer_id'] 
              
              this.toastr.success(`welcome ${sessionStorage['first_name']}`) 
              this.router.navigate(['/home/homepage']) 
        }else if(response['status'] == 'error'){
          console.log(response)
          this.toastr.error(response['message'])
        }
      }) 
    }else if(this.username.length > 8){ 
      this.auth1Service
      .adminlogin(this.username, this.password)
      .subscribe(response => {
        if (response['status'] == 'success'){
          // console.log(response) 
            const data = response['data']
            if(data['role']=='Manager'){
              sessionStorage['emp_first_name'] = data['emp_first_name']
              sessionStorage['emp_last_name'] = data['emp_last_name']  

              this.toastr.success(`welcome ${sessionStorage['emp_first_name']}`)

              this.router.navigate(['/adminHome/dashboard']) 
            }else{
              this.toastr.error('You are not a valid user')
            } 
        }else{
          this.toastr.error('invalid username or password')
        }
      })  
    } 
//     sessionStorage['first_name'] = 'Shivraj'
// sessionStorage['last_name'] = 'Dhanave' 
// this.toastr.success(`welcome ${sessionStorage['first_name']}`)
// this.router.navigate(['/home'])   
  }
} 

