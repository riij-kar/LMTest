import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../users/user.service';
import { UserDetailInterface } from '../heroes/hero';

//forms
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  //build-form
  userDetailForm : FormGroup;
  editMode:boolean = false;
  genders_array : string[] = ['male', 'female', 'transgender'];
  submitted = false;

  user_id: string;
  userDetail: any = {};

  constructor(private route: ActivatedRoute, 
    private userService: UserService, 
    private _location: Location) {
    
    this.user_id = route.snapshot.params._id;

   }

  ngOnInit() {
    if(this.user_id != "add"){
      this.getUserDetails(this.user_id);
    }
    this.editMode = true;
  }

  getUserDetails(id){
    this.userService.getUserById(id).subscribe(response => {
      console.log(response);
      this.userDetail = response;
      this.editMode = true;
    });
  }

  onSubmit(udfm) { 
    //console.log(udfm);
    
    this.submitted = true;
    
    let json_obj: any = {
      //'id' : this.user_id,
      'name': udfm.form.controls.name.value,
      'age': udfm.form.controls.age.value,
      'email': udfm.form.controls.email.value,
      'gender': udfm.form.controls.gender.value,
      'company': udfm.form.controls.company.value,
      'phone': udfm.form.controls.phone.value,
      'address': udfm.form.controls.address.value,
      'isActive': typeof udfm.form.controls.isActive.value == 'undefined'? false :  udfm.form.controls.isActive.value,
      'balance': udfm.form.controls.balance.value
    };

    

    if(this.user_id != "add"){

        json_obj.id = this.user_id;

        this.userService.updateUsers({'data' : json_obj}).subscribe(res => {
          //console.log(res);
    
          if (res.status == "success"){
            this.refresh();
          }
        });
    }
    else{ 
      var today = new Date();
      json_obj._id = today.getMilliseconds();
      json_obj.picture = this.userDetail.picture;
      console.log(json_obj);
      //return false;
      this.userService.saveUsers({'data' : json_obj}).subscribe(res => {
        console.log(res);
  
        if (res.status == "success"){
          this._location.back();
        }
      });
    }


  }

  refresh(): void {
    window.location.reload();
}
  



}
