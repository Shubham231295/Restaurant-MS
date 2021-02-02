import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpMenuRoutingModule } from './emp-menu-routing.module';
import { MenuListComponent } from './menu-list/menu-list.component';
import { MenuAddComponent } from './menu-add/menu-add.component';


@NgModule({
  declarations: [MenuListComponent, MenuAddComponent],
  imports: [
    CommonModule,
    EmpMenuRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ]
})
export class EmpMenuModule { }
