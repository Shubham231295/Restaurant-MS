
import { PreviewComponent } from './preview/preview.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { EditAddressComponent } from './edit-address/edit-address.component';

const routes: Routes = [
  {path: 'edit-address', component: EditAddressComponent},
  {path: 'preview', component: PreviewComponent},
  {path: 'order-history', component: OrderHistoryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
