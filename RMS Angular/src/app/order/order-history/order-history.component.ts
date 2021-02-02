import { CartService } from './../../menu/cart.service';
import { OrderService } from './../order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-history', 
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  orders = [{}]
  totalAmount = 0
  order=[{}]

  constructor(
    private orderService : OrderService
  ) { }

  ngOnInit(): void {
    this.getOrders()  
  }

  getOrders(){
    const customer_id = `${sessionStorage['customer_id']}`
    this.orderService.getOrderId(customer_id)
    .subscribe(response => {
      if (response['status'] == 'success'){
        this.orders = response['data']
        for (let index = 0; index < this.orders.length; index++) {
          const item = this.orders[index];
          //console.log(this.orders[index]['total_amount'])
          this.totalAmount += parseFloat(this.orders[index]['total_amount'])
        }
      }
    })
  }


}
