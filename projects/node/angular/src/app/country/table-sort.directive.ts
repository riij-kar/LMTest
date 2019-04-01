import { Directive, EventEmitter, Input, Output, HostBinding } from '@angular/core';

export type SortDirection = 'asc' | 'desc' | '';//
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };
export const compare = (v1, v2) => (v1 < v2) ? -1 : (v1 > v2) ? 1 : 0; 

export interface SortEvent {
  column: string;
  direction: SortDirection;
}

@Directive({
  selector: '[appTableSort]',
  host: { //used for binding all events here
    '[style.cursor.pointer]': 'direction',
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class TableSortDirective {
  @Input() sortable: string;
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  //host binding
  @HostBinding('title') title: string = 'Decending';

  constructor() { }

  rotate() {
    this.direction = rotate[this.direction];
    this.title = (this.direction === 'asc' ? 'Ascending' : 'Decending');
    this.sort.emit({column: this.sortable, direction: this.direction});
  }

}
