import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  open: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('document:click', ['$event']) mouseClick(eventData: Event) {
    if (!this.open && this.el.nativeElement.contains(eventData.target)) {
      this.renderer.addClass(this.el.nativeElement, 'open');
      this.open = true;
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'open');
      this.open = false;
    }
  }
}
