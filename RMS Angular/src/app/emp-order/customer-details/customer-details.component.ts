import { UserService } from 'src/app/user/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  user = null
  Username=''
  firstname=''
  lastname=''
  address=''
  city=''
  country=''
  zip=''
  phone_no=''
  email =''

  constructor(
    private userService: UserService) { }

  ngOnInit(): void { 
    this.loadUsers()
  }

  loadUsers(){ 
    const id = `${sessionStorage['customer_id']}` 
    console.log(id)
    this.userService.
    getUserid(id) 
    .subscribe(response => {
      // console.log(response)
      if (response['status'] == 'success'){
        this.user = response['data']
        this.Username=this.user['username']
        this.firstname=this.user['first_name']
        this.lastname=this.user['last_name']
        this.address=this.user['address']
        this.city = this.user['city']
        this.country = this.user['country']
        this.zip = this.user['zip']
        this.phone_no = this.user['phone_no']
        this.email = this.user['email']
      }else{
        console.log(response['error'])
      }
    })
  }

}
