import { CustomerDetailsComponent } from './../customer-details/customer-details.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { EmpOrderService } from '../emp-order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders = [{}]
  cust_id= []
  totalAmount = 0
  tot_amt = []
  cust = []
  temp= []
  order_status = []

  constructor(
    private modalService: NgbModal,
    private empOrderService : EmpOrderService
    ) { }

  ngOnInit(): void { 
    // this.orderById()
    this.loadOrder()
  }
  
  loadOrder(){   
    // console.log(this.temp)
    //to get all orders in database//
    this.empOrderService 
    .getOrder() 
    .subscribe(response => {
      if (response['status'] = 'success'){
        this.orders = response['data']
        //to get all the customer id to show in the first column
        for (let i = 0; i < this.orders.length - 1; i++) {
          const j = i+1
          if(this.orders[i]['customer_id'] != this.orders[j]['customer_id']){
            this.cust_id.push(this.orders[i]['customer_id'])
          }
        }
        this.cust_id.push(this.orders[this.orders.length-1]['customer_id'])
        
        //getting orders by cust_id
        for (let i = 0; i < this.cust_id.length; i++) {
          this.empOrderService.getOrderId(this.cust_id[i])
          .subscribe(response => {
            if (response['status'] == 'success'){
              this.temp = response['data']
            }
            if (this.temp[0]['order_status'] == false) {
              this.order_status.push('Not delivered')
            } else {
              this.order_status.push('delivered') 
            } 
            // this.order_status.push(this.temp[0]['order_status'])
            for (let index = 0; index < this.temp.length; index++) {
              this.totalAmount += parseFloat(this.temp[index]['total_amount'])  
            }
            this.tot_amt.push(this.totalAmount)
            this.totalAmount=0
          })
        }
          this.tot_amt.push(this.totalAmount)
          // console.log(this.tot_amt)
      }else if (response == null){
        location.reload()      }
 
    }) 
  } 

  orderById(){  
    console.log(this.cust_id.length)
    for (let i = 0; i < this.cust_id.length; i++) {
      this.empOrderService.getOrderId(this.cust_id[i])
      .subscribe(response => {
        if (response['status'] == 'success'){
          const temp = response['data']
          this.cust.push(temp)
          console.log(this.cust)
          for (let index = 0; index < this.cust.length; index++) {
            this.totalAmount += parseFloat(this.cust[index]['total_amount'])
          }
        }
      }) 
    }
  }  


  
  onDelete(order){
    console.log(order)
    this.empOrderService.deleteOrder(order)
    .subscribe(response => {
      console.log(response)
      this.loadOrder()
      // if(response['status'] == 'success'){
      // }else{
      //   console.log(response['error'])
      // }
    })
  }
 
  getcustdetails(c){ 
    sessionStorage['customer_id'] = c 
    this.modalService.open(CustomerDetailsComponent, {size: 'md'})
  }

}
 
