import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { UserDetailInterface } from '../heroes/hero';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit { 
  users : any[];

  search = (text: Observable<any>) =>
    text.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => {
        let data = [];
        
        this.users.forEach(element => {
          data.push(element.name);
        });
        
         if(term == ""){
          this.getUsers();
         }

        if(term.length < 2){

          return [];
        }
        else{

        this.users = this.users.filter(n => (n.name).toLowerCase().indexOf(term.toLowerCase()) > -1);

        return data.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10);
      }

    })
  )
    
  constructor(private uservice: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.uservice.getusers().subscribe((response:UserDetailInterface[]) => this.users = response);
  } 

  deleteUser (id) : void{
    console.log(id);

    if(id){ 
      if(confirm('Do you want to delete this user')){
        //console.log('yes');
        this.uservice.deleteUser(id).subscribe(response => {
          console.log(response);
          if(response.status == "success"){
            this.users = response.data;
          }
        });
      }
    }
  }


  searchChange(){
    
    console.log(this.users);
  }
}
