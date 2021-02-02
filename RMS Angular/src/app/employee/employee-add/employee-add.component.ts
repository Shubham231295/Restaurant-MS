import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from './../employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {

  firstname = ''
  lastname = ''
  phone_number = 0
  role = ''
  username = ''
  password = ''

  employee = null
 
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private employeeService: EmployeeService) { }
 
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.queryParams['id'] 
    if (id){
      this.employeeService
      .getEmployeesDetails(id)
      .subscribe(response => {
        if (response['status'] == 'success'){
          const employees = response['data']
          //console.log(employees)
          if (Object.keys(employees).length > 0){
            
            this.employee = employees;
            this.firstname = employees['emp_first_name']
            this.lastname = employees['emp_last_name']
            this.phone_number = employees['emp_phone_no']
            this.username = employees['username']
            this.password = employees['password']
            this.role = employees['role']

            //console.log(this.firstname)
          }
        }
      })
    }
  }


  onUpdate(){
    if (this.employee){
      if(this.username.length <= 8){
        this.toastr.error('username should be of more than 8 characters')
      }else{
        this.employeeService
        .updateEmployee(this.employee['emp_id'], this.firstname, this.lastname, this.phone_number, this.role, this.username, this.password)
        .subscribe(response => {
          //console.log(response)
          if (response['status'] == 'success'){
            this.router.navigate(['/adminHome/employee/employee-list'])
          }
        })
      }
    }else{ 
      if(this.username.length <= 8){
        this.toastr.error('username should be of more than 8 characters')
      }else{ 
        this.employeeService
        .insertEmployee(this.firstname, this.lastname, this.phone_number,this.role, this.username, this.password)
        .subscribe(response => {
          //console.log(response)
          if (response['status'] == 'success'){
            this.router.navigate(['/adminHome/employee/employee-list'])
          }
        })
      }
    }

  }


  onCancel(){
      this.router.navigate(['/adminHome/employee/employee-list'])
  }

}


