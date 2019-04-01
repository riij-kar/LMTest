import { Directive, ElementRef, Input } from '@angular/core';
import { UserDetailInterface } from '../heroes/hero';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Directive({
  selector: '[appUserDetail]'
})
export class UserDetailDirective {
  private mainurl = "http://localhost:3000/api";
  private userUploadUrl = this.mainurl + '/user/upload';
  private fileElem;
  @Input() userDetail:UserDetailInterface;


  constructor(private el: ElementRef, private http: HttpClient) {
    
    var closetParent = (this.el.nativeElement);

    closetParent.addEventListener('dragover', () => {      
      this.fileElem.style.border = '1px dashed red';
    });

    closetParent.addEventListener('dragleave', () => {
      this.fileElem.style.border = '';
    });

    closetParent.addEventListener('drop', (e) => {
      this.fileElem.style.border = '';
      var file = e.dataTransfer.files[0];
      console.log(this.userDetail);
      this.fileRead(file);
    });

   }

   fileRead(file) :void{
    var reader = new FileReader();

       reader.onload =  (e:any) => {
         
         this.userDetail.picture = e.target.result;

         var formdata = new FormData();
         formdata.append('image_file', this.userDetail.picture);
         formdata.append('_id', this.userDetail._id);


          var udhp = this.userDetail;
          if(udhp.hasOwnProperty('_id')){

            this.http.post(this.userUploadUrl, formdata).subscribe((res:any) => {
                console.log(res);
                this.userDetail.picture = res.imgURL;
            });
          }
         
      };

      reader.readAsDataURL(file);
   }


   ngAfterViewInit() {
    this.fileElem = this.el.nativeElement.querySelector('input#image_upload');
  }

   
   

}
