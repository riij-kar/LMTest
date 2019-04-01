import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';

import { HttpClientModule }    from '@angular/common/http';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserDetailDirective } from './user-detail/user-detail.directive';
import { CountryComponent } from './country/country.component';

//material
import {MatNativeDateModule} from '@angular/material';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';  
import {DemoMaterialModule} from './material-module.module';

//drag and drop module
import { DragDropModule } from '@angular/cdk/drag-drop';

//bootstrap module
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TableSortDirective } from './country/table-sort.directive';
import { TableDragDirective } from './country/table-drag.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    UsersComponent,
    UserDetailComponent,
    UserDetailDirective,
    CountryComponent,
    TableSortDirective,
    TableDragDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatNativeDateModule,
    DemoMaterialModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { } 
