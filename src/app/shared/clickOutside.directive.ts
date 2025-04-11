import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appClickOutside]'  // Este es el selector que usarás en tu HTML
})
export class ClickOutsideDirective {

  @Output() clickOutside = new EventEmitter<void>();

  constructor(private el: ElementRef) {}

  // Detecta el clic fuera del elemento
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    // Verifica si el clic se hizo fuera del elemento
    if (!this.el.nativeElement.contains(event.target)) {
      this.clickOutside.emit();  // Llama al evento clickOutside
    }
  }
}
