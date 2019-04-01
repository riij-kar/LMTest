import { Injectable } from '@angular/core';
import { UserDetailInterface } from '../heroes/hero';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: any;
  private mainurl = "http://localhost:3000/api";
  private getUsers = this.mainurl + '/users';
  private getUserDetails = this.mainurl + '/user/';
  private updateUserDetails = this.mainurl + '/user/save';
  private saveUserDetails = this.mainurl + '/user/add';
  private deleteUserUrl = this.mainurl + '/user/delete/';

  constructor(private http: HttpClient) { }
  
  getusers (): Observable<object> {
     let Users = this.users =  this.http.get(this.getUsers);
     return Users;
  }

  getUserById(id): Observable<UserDetailInterface>{
    return this.http.get<UserDetailInterface>(this.getUserDetails + id);
  }

  updateUsers(user) : any {
    return this.http.post(this.updateUserDetails, user);
  }

  saveUsers(user) : any {
    return this.http.post(this.saveUserDetails, user);
  }

  deleteUser(id) : any {
    return this.http.get(this.deleteUserUrl + id);
  }
}
