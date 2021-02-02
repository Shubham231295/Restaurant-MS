import { MenuAddComponent } from './menu-add/menu-add.component';
import { MenuListComponent } from './menu-list/menu-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'menu-list', component: MenuListComponent},
  {path: 'menu-add', component: MenuAddComponent},

];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpMenuRoutingModule { }
