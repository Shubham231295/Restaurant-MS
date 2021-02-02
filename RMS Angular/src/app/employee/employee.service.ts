import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  url = 'http://localhost:8080/employees'

  constructor(
    private httpClient: HttpClient
  ) { }

  getEmployees(){ 
    return this.httpClient.get(this.url)
  }

  getEmployeesDetails(emp_id){
    return this.httpClient.get(this.url+ "/" + emp_id)
  }
 
  updateEmployee(emp_id, emp_first_name: string, emp_last_name: string, emp_phone_no: number, role: string,username:string, password: string){
    const body ={
      emp_id:emp_id,
      emp_first_name: emp_first_name,
      emp_last_name: emp_last_name,
      emp_phone_no: emp_phone_no,
      role:role,
      username: username,
      password: password
    }

    return this.httpClient.put(this.url+ "/" + emp_id,body)
  }

  deleteEmployee(emp_id){
    return this.httpClient.delete(this.url+"/"+emp_id)
  }

  insertEmployee(emp_first_name: string, emp_last_name: string, emp_phone_no: number, role: string,username:string, password: string){
    const body ={
      emp_first_name: emp_first_name,
      emp_last_name: emp_last_name,
      emp_phone_no: emp_phone_no,
      role:role,
      username: username,
      password: password
    }

    return this.httpClient.post(this.url+ "/" ,body)   //add "/create"
  }

  getCount(){
    return this.httpClient.get(this.url+"/count")
  }
}
