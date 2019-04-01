import { Directive, EventEmitter, Input, Output, HostBinding, HostListener
,  ElementRef, Renderer2, ViewChild, SimpleChanges
} from '@angular/core';

import { Country } from './country';
// this directive not in use for drag and drop purpose
@Directive({
  selector: '[appTableDrag]',
  host: { //used for binding all events here
    '(dblclick)': 'openView()',
    '(keyup.enter)' : 'closeView()',
    '(keyup.esc)' : 'closeView()',
    '(focusout)' : 'closeView()'
  }
})

export class TableDragDirective {
  // @HostListener('click', ['$event.target'])
  //   onClick(btn) {
  //     console.log('button', btn);
  // }
  @Input() editingData: boolean[];
  @Input() editIndex;
  //@Input() c: Country;


  constructor(public el: ElementRef, public _renderer: Renderer2) {
      //closetParent = (this.el.nativeElement);

      // closetParent.addEventListener('click', () => {
      //     console.log(closetParent);
      // });
      
      //this.countryDiffer = 
  }

  openView(){
    
    for (var i = 0; i < this.editingData.length; i++) {

      this.editingData[i] = false;
    }

    this.editingData[this.editIndex] = true;
    setTimeout(() => {
      
      this.el.nativeElement.children["0"].children["0"].focus();
    },100);
   

  }

  closeView(){
    
    for (var i = 0; i < this.editingData.length; i++) {

      this.editingData[i] = false;
    }
  }



}
