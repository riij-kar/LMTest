import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { CountryComponent } from './country/country.component';

const routes: Routes = [
  { path: 'heroes', component: HeroesComponent },
  { path: 'users', component: UsersComponent },
  { path: 'user/:_id', component: UserDetailComponent },
  { path: 'user/add', component: UserDetailComponent },
  { path: 'all_countries', component: CountryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 
