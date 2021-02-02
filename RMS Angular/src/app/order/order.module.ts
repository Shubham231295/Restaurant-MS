import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { PreviewComponent } from './preview/preview.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { EditAddressComponent } from './edit-address/edit-address.component';


@NgModule({
  declarations: [PreviewComponent, OrderHistoryComponent, EditAddressComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
