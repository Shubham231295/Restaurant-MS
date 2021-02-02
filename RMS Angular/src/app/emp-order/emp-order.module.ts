import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpOrderRoutingModule } from './emp-order-routing.module';
import { OrderListComponent } from './order-list/order-list.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';


@NgModule({
  declarations: [OrderListComponent, CustomerDetailsComponent],
  imports: [
    CommonModule,
    EmpOrderRoutingModule,
    NgbModule
  ]
})
export class EmpOrderModule { }
