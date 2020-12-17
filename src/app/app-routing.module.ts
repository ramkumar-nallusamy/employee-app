import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllListComponent } from './all-list/all-list.component';
import { HomeComponent } from './home/home.component';
import { UserDetailsComponent } from './user-details/user-details.component';


const routes: Routes = [
  // { path:'', redirectTo :'home'},
  { path:'home', component : HomeComponent, pathMatch: 'full'},
  { path:'all-users', component : AllListComponent},
  { path: 'emp-details/:id', component : UserDetailsComponent},
  { path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
