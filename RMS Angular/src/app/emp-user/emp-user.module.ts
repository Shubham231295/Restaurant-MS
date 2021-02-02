import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpUserRoutingModule } from './emp-user-routing.module';
import { UserListComponent } from './user-list/user-list.component';


@NgModule({
  declarations: [UserListComponent],
  imports: [
    CommonModule,
    EmpUserRoutingModule
  ]
})
export class EmpUserModule { }
