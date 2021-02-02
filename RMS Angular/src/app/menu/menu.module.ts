import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { GalleryComponent } from './gallery/gallery.component';
import { CartComponent } from './cart/cart.component';
import { MenuService } from './menu.service';


@NgModule({ 
  declarations: [GalleryComponent, CartComponent],
  imports: [
    CommonModule,
    MenuRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers:[MenuService]
})
export class MenuModule { }
