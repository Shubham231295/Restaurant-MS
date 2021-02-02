import { EmployeeService } from './../employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees= [{}]

  constructor(
    private router: Router,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.loadEmployees()
  }   
 
  onEdit(employee){
    this.router.navigate(['/adminHome/employee/employee-add'], {queryParams: {id: employee['emp_id']}})
  }

  onDelete(employee){
    this.employeeService.deleteEmployee(employee['emp_id'])
    .subscribe(response => {
      if(response['status'] == 'success'){
        this.loadEmployees()
      }else{
        console.log(response['error'])
      }
    }) 
  }

  loadEmployees(){
    this.employeeService
    .getEmployees()
    .subscribe(response => {
      //console.log(response)
      if (response['status'] = 'success'){
        this.employees = response['data']
      }else{
        console.log(response['error'])
      }
      console.log(this.employees)
    })
  }

  addEmployee(){
    this.router.navigate(['/adminHome/employee/employee-add'])
  }

}
