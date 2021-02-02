import { EmpUserService } from './../emp-user/emp-user.service';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee/employee.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  countuser:number
  countemployee:number
  
  constructor(
    private empUserServise: EmpUserService,
    private employeeService: EmployeeService
  ) { }
  
  ngOnInit(): void {
    this.getCountUser() 
    this.getCountEmployee()
  }

  getCountUser(){
    this.empUserServise.getCount()
    .subscribe(response => {
      if(response['status']=='success'){
        this.countuser = response['data']
      }
    })
  }

  getCountEmployee(){
    this.employeeService.getCount()
    .subscribe(response => {
      if(response['status']=='success'){
        this.countemployee = response['data']
      }
    })
  }
}
