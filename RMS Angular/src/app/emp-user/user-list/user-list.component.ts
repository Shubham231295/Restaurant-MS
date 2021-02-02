import { EmpUserService } from './../emp-user.service';
import { UserService } from 'src/app/user/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users = [{}] 

  constructor(
    private empUserService:EmpUserService) { }

  ngOnInit(): void {
    this.loadUsers()
  } 

  onDelete(user){
    this.empUserService.deleteUser(user['customer_id'])
    .subscribe(response => {
      console.log(response)
      if(response['status'] == 'success'){
        this.loadUsers()
      }else{
        console.log(response['error'])
      }
    }) 
  }

  loadUsers(){ 
    this.empUserService.
    getUser()
    .subscribe(response => {
      //console.log(response)
      if (response['status'] == 'success'){
        this.users = response['data']
      }else{
        console.log(response['error'])
      }
    })
  }

}
 