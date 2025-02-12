import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DropDownAnimation } from '../animations/animations';

// https://stackblitz.com/edit/drop-down-menu-animation
@Component({
  selector: 'app-dropdown-button',
  templateUrl: './dropdown-button.component.html',
  styleUrl: './dropdown-button.component.scss',
  animations: [DropDownAnimation]
})

export class DropdownButtonComponent implements AfterViewInit {
  isOpen = false;
  //TODO Rewrite with generics
  @Input('items') items: any[] = ['Your Item 1', 'Your Item 2', 'Your Item 3'];
  @Input('selectedItem') selectedItem: any = this.items[0];

  @Output() selectedItemChange = new EventEmitter<any>();

  @ViewChild('dropDownBox') dropDownBox!: ElementRef;
  constructor(private cdr: ChangeDetectorRef) {}
  
  ngAfterViewInit() {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        this.selectedItemChange.emit(this.selectedItem);
      });
    });
    observer.observe(this.dropDownBox.nativeElement, { childList: true, characterData: true, subtree: true });
    this.selectedItem = this.items[0];
    this.cdr.detectChanges();  // Run change detection again
  }

}
