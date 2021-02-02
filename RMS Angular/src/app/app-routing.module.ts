import { HomepageComponent } from './homepage/homepage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AuthService } from './auth/auth.service';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core'; 
import { Routes, RouterModule } from '@angular/router';
import { Auth1Service } from './auth/auth1.service';

const routes: Routes = [  
  { path : '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path : 'home', component: HomeComponent, canActivate: [AuthService], 
  children: [
  { path: 'homepage', component: HomepageComponent},
  { path: 'user', loadChildren:() => import('./user/user.module').then(m => m.UserModule) },
  { path: 'order', loadChildren:() => import('./order/order.module').then(m => m.OrderModule) },
  { path: 'menu', loadChildren:() => import('./menu/menu.module').then(m => m.MenuModule) }
    ]
  },  
  { path : 'adminHome', component: AdminHomeComponent,canActivate: [Auth1Service], 
  children: [
  { path: 'dashboard', component: DashboardComponent},
  { path: 'employee', loadChildren:() => import('./employee/employee.module').then(m => m.EmployeeModule) },
  { path: 'emp-user', loadChildren:() => import('./emp-user/emp-user.module').then(m => m.EmpUserModule) },
  { path: 'emp-menu', loadChildren:() => import('./emp-menu/emp-menu.module').then(m => m.EmpMenuModule) },
  { path: 'emp-order', loadChildren:() => import('./emp-order/emp-order.module').then(m => m.EmpOrderModule) } 
  ]
},
 

  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
