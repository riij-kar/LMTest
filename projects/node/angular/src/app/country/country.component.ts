import { Component, OnInit, ViewChildren, QueryList, PipeTransform, ViewEncapsulation  } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';

import { CountryService } from  './country.service';
import { Country } from './country';
import { TableSortDirective, SortEvent, compare } from './table-sort.directive';

//drag and drop
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

//modal
import { NgbModalConfig, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

//rxjs
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [NgbModalConfig, NgbModal]//modal
})
export class CountryComponent implements OnInit {
  editingData: boolean[] = [];
  public countries: Country[] = [];
  filter = new FormControl('');

  masterSelected:boolean;
  selectAnyCheckbox:boolean;

  //count pages
  showingData:number = 20;
  Limit:number = 20;
  initialData:number = 0;
  totalData:number;
  pageIteration:number[] = [];

  @ViewChildren(TableSortDirective) headers: QueryList<TableSortDirective>;

  constructor(
    private countryService: CountryService, 
    private _modalService: NgbModal, //modal
    config: NgbModalConfig//modal
  ){

    this.masterSelected = false;
    this.selectAnyCheckbox = false;
  }

  check(pt: PipeTransform){
    console.log(this.filter.value);
    if(this.filter.value == ''){
      this.getCountry();
    }
    else{ 

      const term = this.filter.value.toLowerCase();
      this.countries = this.countries.filter(country => {
        return country.name.toLowerCase().includes(term) 
          || country.capital.toLowerCase().includes(term)
          || country.callingCodes[0].includes(term);
      });
    }
  }

  ngOnInit() {
    this.getCountry();
  }

  getCountry (){
    this.countryService.getAllCountry().subscribe((r : Country[]) => {
      this.countries = r;
      this.totalData = this.countries.length;
      
      for (var i = 0; i <= Math.ceil(this.totalData / this.showingData); i++) {
        this.pageIteration.push(i + 1);
      }


      for (var i = 0; i < this.countries.length; i++) {
        this.countries[i].isSelected = this.masterSelected;
        this.editingData[i] = false;
      }
    });

    
  }

  //only sort
  onSort({column, direction}: SortEvent){
    this.countries = [];
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.countryService.getAllCountry().subscribe(r => {

      if (direction === '') {

          this.countries = r;
          // for (var i = 0; i < this.countries.length; i++) {
          //   this.countries[i].isSelected = this.masterSelected;
          // }
        } 
        else {

          this.countries = r.sort((a, b) => {
            const res = compare(a[column], b[column]);
            return direction === 'asc' ? res : -res;
          });
        }
    });
  }

  //only drag and drop
  drop(event: CdkDragDrop<string[]>) {
    //console.log(event);
    moveItemInArray(this.countries, event.previousIndex, event.currentIndex);
  }

  //select/ deselect
  checkUncheckAll(){

    for (var i = 0; i < this.countries.length; i++) {

      this.countries[i].isSelected = this.masterSelected;
    }

    this.deleteCheck();
  }

  isAllSelected(country){
    this.masterSelected = this.countries.every(function(item:any) {
      return item.isSelected == true;
    });

    this.deleteCheck();
  }

  deleteCheck(){
    this.selectAnyCheckbox = false;
    for (var i = 0; i < this.countries.length; i++) {

      if(this.countries[i].isSelected){
        this.selectAnyCheckbox = true;
        break;
      }
    }
  }

  confirmDeleteRow(){
    this.countries = this.countries.filter(function(e){
      return e.isSelected !== true;
    });
    this.selectAnyCheckbox = false;

    //console.log(name);
    //console.log(this._modalService);
    //this._modalService.open(name);//modal
  }

  showNext(p: number){
    this.initialData = (p-1) * this.Limit;
    this.showingData = this.Limit * p;
    console.log(this.initialData, this.showingData);
  }

  changeMat(e){
    this.pageIteration = [];
      for (var i = 0; i <= Math.ceil(this.totalData / this.showingData); i++) {
        this.pageIteration.push(i + 1);
      }
  }
}