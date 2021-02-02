import { UserService } from 'src/app/user/user.service';
import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  user = null
  Username=''
  firstname=''
  lastname=''
  address=''
  city=''
  country='India'
  zip=0
  phone_no=0
  password=''
  email = ''

  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private router: Router
  ) { }

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
        console.log(this.Username)
        console.log(this.email)
      }
    })
  } 

  onSave(){
    const id = this.user['customer_id']
    this.userService
    .updateCustomer(id,this.firstname,this.lastname,this.city,this.country,this.zip,this.phone_no,this.Username,this.password,this.address,this.email)
    .subscribe(response => {
      if(response['status'] == 'success'){ 
        // this.router.navigate(['/home/user/profile'])
        location.reload();
        this.modalService.dismissAll(EditProfileComponent)
      } 
    })
  }
 
}
 