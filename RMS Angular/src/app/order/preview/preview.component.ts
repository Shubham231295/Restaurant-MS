import { ToastrService } from 'ngx-toastr';
import { OrderService } from './../order.service';
import { CartService } from './../../menu/cart.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/user/user.service';
import { EditAddressComponent } from '../edit-address/edit-address.component';


 
@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
 
  address = ''
  city =''
  country = ''
  zip=0
  user=null
  carts=[{}]
  totalAmount=0
  order = [{}]
 
  constructor(
    private toastr: ToastrService,
   private modalService: NgbModal,
   private userService: UserService,
   private cartService: CartService,
   private orderService: OrderService,
    private router : Router
  ) { }
  
  ngOnInit(): void {
    this.getUsers()
    this.getCart()
    // console.log(this.carts)
  }
  
  getUsers(){ 
    const id = `${sessionStorage['customer_id']}`
    this.userService.
    getUserid(id)
    .subscribe(response => {
      // console.log(response)
      if (response['status'] == 'success'){
        this.user = response['data']
        this.address=this.user['address']
        this.city = this.user['city']
        this.country = this.user['country']
        this.zip = this.user['zip']
      }else{
        console.log(response['error'])
      }
    })
  } 

 onEdit(){ 
  this.modalService.open(EditAddressComponent, {size: 'lg'})
 }

 getCart(){
  const customer_id = `${sessionStorage['customer_id']}`
    this.cartService.getCartItemId(customer_id)
  .subscribe(response => {
    if(response['status'] == 'success'){ 
      this.carts = response['data'] 
      // console.log(this.carts)

        for (let index = 0; index < this.carts.length; index++) {
          const item = this.carts[index];
          //console.log(this.carts[index]['total_amount'])
          this.totalAmount += parseFloat(this.carts[index]['total_amount'])
        }
    }
  })
} 

onPlaceOrder(){  
  for (let i = 0; i < this.carts.length; i++) {
    this.orderService.addtoOrder(this.user['customer_id'],this.carts[i]['menu_id'],this.carts[i]['mname'],this.carts[i]['price'],this.carts[i]['total_amount'],this.carts[i]['quantity'])
    .subscribe 
    (response => {
      if(response['status'] == 'success'){
        
        console.log('added item')
      }
    })
  }


    this.userService.sendMail(this.user['customer_id'])
    .subscribe(response => {
      if(response['status'] == 'success'){
        console.log('mail sent')
      }
    })

  this.cartService.deleteCart(this.user['customer_id'])
  .subscribe 
    (response => {
      if(response['status'] == 'success'){
        
        console.log('cart deleted')
    } 
  })


// this.order = response['data']
// console.log(this.order) 
this.toastr.success('Order placed successfully')
this.router.navigate(['/home/order/order-history'])

}
}

// this.orderService.addtoCart(this.user['customer_id'],this.carts['menu_id'],this.carts['mname'],this.carts['price'],this.carts['total_amount'],this.carts['quantity'],this.user['zip'],this.user['phone_no'],this.user['email'],this.user['address'])