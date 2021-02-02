import { CartService } from './../cart.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html', 
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  items=[]
  totalAmount=0
  totalprice=0

  constructor(
    private modalService: NgbModal,
    private router : Router,
    private toastr : ToastrService,
    private cartService : CartService 
  ) { } 

  ngOnInit(): void {
    this.loadCartItems()
  } 
 
  loadCartItems(){
    const customer_id = `${sessionStorage['customer_id']}`
    this.cartService.getCartItemId(customer_id)
    .subscribe(response => {
      if(response['status'] == 'success'){
        // console.log(response)
        this.items = response['data']
        //console.log(this.items[0]['price']*this.items[0]['quantity'])
        // for (let i = 0; i < this.items.length; i++) {
        //   this.totalprice = this.items[i]['price']*this.items[i]['quantity'];
        //   console.log(this.totalprice)
        // }

        this.totalAmount=0
        for (let index = 0; index < this.items.length; index++) {
          const item = this.items[index];
          //console.log(this.items[index]['total_amount'])
          this.totalAmount += parseFloat(this.items[index]['total_amount']) //item['totalAmount']
        }
      }
    })
  } 
 
  onDelete(item){ 
    this.cartService.deleteCartItem(item['id'])
    .subscribe(response =>{
      if(response['status']=='success'){
        this.toastr.success['item deleted']
        this.loadCartItems()
      }
    }) 
  } 
 
  updateQuantity(quantity,item){ 
    const customer_id = `${sessionStorage['customer_id']}`
    const newQuantity = item['quantity'] + quantity
    if(newQuantity == 0){
      this.onDelete(item)
    }else{
      this.cartService.updateCartItem(item['id'],customer_id,item['menu_id'],item['mname'],newQuantity,item['price'])
    .subscribe(response =>{
      if(response['status']=='success'){
        this.toastr.success['Quantity updated']
        this.loadCartItems()
      }
    })
    }
  } 

  onCheckout(){
    this.router.navigate(['/home/order/preview'])
    this.modalService.dismissAll()
  }

}
