import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-page-content',
  templateUrl: './page-content.component.html',
  styleUrl: './page-content.component.scss',
  encapsulation: ViewEncapsulation.None 
})
export class PageContentComponent implements AfterViewInit{
  
  @Input() totalCount?: number;
  @Input() pageSize?: number;
  @Input() pageIndex?: number;
  @Output() pageChanged = new EventEmitter<number>();

  onPagerChanged(event: any) {
    this.pageChanged.emit(event.page);
  }
  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngAfterViewInit(): void {
  }
}
