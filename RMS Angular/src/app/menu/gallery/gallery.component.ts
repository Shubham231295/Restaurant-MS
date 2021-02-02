import { CartComponent } from './../cart/cart.component';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { MenuService } from '../menu.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
    

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  isDisabled = false

  menus = []
  cart=null

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private menuService: MenuService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.loadMenus()
    this.getCart()
  }

  loadMenus(){
    this.menuService.getMenus()
    .subscribe(response => {
      if(response['status'] == 'success'){
        //console.log(response)
        this.menus=response['data'] 
      }
    })
  }  
   
  addToCart(menu){   
      const customer_id = `${sessionStorage['customer_id']}`
      this.cartService.addCartItem(customer_id,menu['menu_id'],menu['mname'],menu['price'],1) 
    .subscribe(response => {
      if(response['status'] == 'success'){
        // console.log(response)
        this.toastr.success('Menu added to cart')
      }
    })
  } 

  getCart(){ 
    const customer_id = `${sessionStorage['customer_id']}`
    this.cartService.getCartItemId(customer_id)
    .subscribe(response => {
      if(response['status'] == 'success'){
        // console.log(response)
        this.cart = response['data']
      }
    })
  } 

  // addToCart(menu){
  //   const customer_id = `${sessionStorage['customer_id']}`

  //   if(this.cart.length>0){
  //     for (let i = 0; i < this.cart.length; i++) {
  //       if(menu['menu_id'] == this.cart[i]['menu_id']){
  //         const newQuantity = this.cart[i]['quantity']+ 1
  //         this.cartService.updateCartItem(this.cart[i]['id'],customer_id,this.cart[i]['menu_id'],this.cart[i]['mname'],newQuantity,this.cart[i]['price'])
  //         .subscribe(response =>{
  //           if(response['status']=='success'){ 
  //             // location.reload()     
  //           }   
  //           this.toastr.success['Quantity updated'] 
  //         })
  //       }
  //     }
  //   }else{
  //       this.cartService.addCartItem(customer_id,menu['menu_id'],menu['mname'],menu['price'],1) 
  //     .subscribe(response => {
  //       if(response['status'] == 'success'){
  //         // location.reload()     

  //         // console.log(response)
  //       }
  //       this.toastr.success('Menu added to cart')
  //     })
  //   }
  // }

  loadCart(){
    this.modalService.open(CartComponent, {size: 'lg'})
  }
}
