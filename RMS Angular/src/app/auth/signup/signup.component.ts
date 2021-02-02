import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  firstname=''
  lastname=''
  country='India'
  city=''
  address=''
  zip=0
  phoneNumber=0
  email=''
  username=''
  password=''

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {  
  }
 
  onSignup(){
    if(this.firstname.length == 0 || this.lastname.length == 0 || this.country.length == 0 || this.city.length == 0 || this.address.length == 0 || 
      this.phoneNumber==0 || this.zip == 0|| this.email.length == 0 || this.username.length == 0 || this.password.length == 0 ){
        this.toastr.error('Please fill required field')
    }else{

      this.authService.signup(this.firstname, this.lastname, this.country, this.city, this.address, this.zip, this.phoneNumber, this.email,this.username, this.password)
      .subscribe(response => {
        console.log(response)
        if(response['status']=='success'){
          const data = response['data']
          this.toastr.success(`registered successfully`)
          this.router.navigate(['/auth/login']) 
        }
      })
    }
    }

}
//   onSignup(){
//     this.authService
//     .signup(this.firstname, this.lastname, this.country, this.city, this.address, this.zip, this.phoneNumber, this.username, this.password)
//     .subscribe(response => {
//       if (response['status'] == 'success'){
//         console.log(response)
//           const data = response['data']        
//             sessionStorage['firstname'] = data['firstname']
//             sessionStorage['lastname'] = data['lastname'] 
//             this.toastr.success(`welcome ${sessionStorage['firstname']}`)
//             this.router.navigate(['/auth/login']) 
//       }
//     }
//   }
// }

