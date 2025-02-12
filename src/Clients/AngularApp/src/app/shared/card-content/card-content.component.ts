import { AfterViewInit, Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { ColorType } from '../ColorTypeEnum';
import { RandomColorService } from '../../core/random-color.service copy';

@Component({
  selector: 'app-card-content',
  templateUrl: './card-content.component.html',
  styleUrl: './card-content.component.scss'
})
export class CardContentComponent implements AfterViewInit{
  readonly cardClassName : string = 'card-rectangle';
  @Input('description') description = '';
  @Input('title') title = '';
  @Input('borderRadius') borderRadius = '10,10,10,10';
  @Input('colorBackground') colorBackground = 'var(--green-color)';
  htmlRectangle!: HTMLElement;

  constructor(private elementRef: ElementRef,
    private renderer: Renderer2
  ,private randomColorService: RandomColorService) {}
  ngAfterViewInit(): void {
    this.htmlRectangle = this.elementRef.nativeElement.querySelector('.' + this.cardClassName) as HTMLElement;
    this.htmlRectangle.style.backgroundColor = this.colorBackground;
    this.borderRadius.split(',').forEach((value,index) => {
      var valuePixel = value + 'px';
      if(index === 0) this.htmlRectangle.style.borderTopLeftRadius = valuePixel;
      if(index === 1) this.htmlRectangle.style.borderTopRightRadius = valuePixel;
      if(index === 2) this.htmlRectangle.style.borderBottomRightRadius = valuePixel;
      if(index === 3) this.htmlRectangle.style.borderBottomLeftRadius = valuePixel;
    });
  }

  setRandomCardColor() {
    this.htmlRectangle.style.backgroundColor = this.randomColorService.getRandomColor();
  }
}
