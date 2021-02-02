import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-edit-address', 
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css']
})
export class EditAddressComponent implements OnInit {
  Username=''
  firstname=''
  lastname=''
  phone_no=0
  password=''  
  address=''
  city =''
  country = ''
  zip=0
  email = ''
  user=null 

 
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private userService: UserService) {
    
   }

   ngOnInit(): void {
    this.getUsers()
  }

  getUsers(){ 
    const id = `${sessionStorage['customer_id']}`
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
        this.password = this.user['password']
        this.email = this.user['email']
      }
    })
  } 

  onSave(){
    const id = this.user['customer_id']
    this.userService
    .updateCustomer(id,this.firstname,this.lastname,this.city,this.country,this.zip,this.phone_no,this.Username,this.password,this.address,this.email)
    .subscribe(response => {
      if(response['status'] == 'success'){
        // this.router.navigate(['/home/order/preview'])
        location.reload();
        this.modalService.dismissAll(EditAddressComponent)
      }
    })
  }
} 
