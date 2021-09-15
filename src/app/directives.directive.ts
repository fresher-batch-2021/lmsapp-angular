import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDirectives]'
})
export class DirectivesDirective {

  constructor(public element: ElementRef) {
    element.nativeElement.style.backgroundColor = 'red';
  }
}
