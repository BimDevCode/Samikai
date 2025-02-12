import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Directive, Input, ElementRef, HostListener, AfterViewInit, Renderer2, ViewChild, Inject, PLATFORM_ID } from '@angular/core';

@Directive({
  selector: '[appParallaxA]',
})
export class ParallaxADirective implements AfterViewInit {
  parallaxRatio : number = 0.8;
  middleOfPart : number = 0;
  initialYScroll : number = 0;
  isInitialScrollSet : boolean = false;
  isIntersected : boolean = false;
  topOfPart : number = 0;
  topOfTopPart : number = 0;
  initialTop : number = 0;
  previousPart : HTMLElement | null = null;
  nextPart : HTMLElement | null = null;
  part : HTMLElement | null = null;
  topParallaxPart : HTMLElement | null = null;
  @Input('classPartName') classPartName : string = '';
  @Input('topPartName') topPartName : string = '';
  @Input('previousPartName') previousPartName : string = '';
  @Input('nextPartName') nextPartName : string = '';
  @Input('topParallaxPartName') topParallaxPartName : string = '';

  constructor(private elementRef: ElementRef,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document
  ) {}
  ngAfterViewInit() {
    try {
      if (isPlatformBrowser(this.platformId)) {
        var topPart = this.document.querySelector('.' + this.topPartName) as HTMLElement;
        if(this.previousPartName !== '') {
          this.previousPart = this.document.querySelector('.' + this.previousPartName) as HTMLElement;
        }
        if(this.nextPartName !== '') {
          this.nextPart = this.document.querySelector('.' + this.nextPartName) as HTMLElement;
        }
        if(this.topParallaxPartName !== '') {
          this.topParallaxPart = this.document.querySelector('.' + this.topParallaxPartName) as HTMLElement;
        }
        this.part = this.document.querySelector('.' + this.classPartName) as HTMLElement;
        if(this.part  !== null){
          this.topOfTopPart = topPart.offsetTop;
          this.topOfPart = this.part .offsetTop;
          this.middleOfPart = this.topOfPart + this.part .clientHeight / 2;
          this.initialTop = (this.topOfPart-this.topOfTopPart);
          this.elementRef.nativeElement.style.top = this.initialTop + 'px';
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  isPartInViewport():boolean {
    var viewportBottom = (window.scrollY || window.pageYOffset) + window.innerHeight;
    var isPartInViewPort = this.topOfPart <= viewportBottom;

    return isPartInViewPort;
  }
  getCoords(elem : any) {
    let box = elem.getBoundingClientRect();

    return {
      top: box.top + (window.scrollY || window.pageYOffset),
      bottom: box.bottom + (window.scrollY || window.pageYOffset),
    };
  }
  isIntersecting(currentElement : any, previousElement : any): boolean {
    var bottomRectangle = currentElement.getBoundingClientRect();
    var topRectngle = previousElement.getBoundingClientRect();
    if(this.part !== null){
      var textPart = this.part.getBoundingClientRect();
      var isIntersect = (topRectngle.bottom > bottomRectangle.top)
                          && (textPart.top < bottomRectangle.top);

      if(this.isInitialScrollSet === false && isIntersect)
      {
        this.initialYScroll = window.scrollY || window.pageYOffset;
        this.isInitialScrollSet = true;
      }
      return isIntersect;
    }
    return false;

  }

@HostListener("window:scroll", ["$event"])
onWindowScroll(event: any){
  if (isPlatformBrowser(this.platformId)) {
    try {
      if(this.isPartInViewport()){
        if(this.elementRef === undefined) {
          console.log('elementReference is undefined');
          return;
        }
        var position = this.elementRef.nativeElement.getBoundingClientRect();
        var middleOfImage = window.scrollY + (position.top + position.bottom) / 2;
        if (this.topPartName === this.classPartName){ //First part
          if(this.isInitialScrollSet === false)
          {
            this.initialYScroll = window.scrollY || window.pageYOffset;
            this.isInitialScrollSet = true;
          }
          if(this.elementRef.nativeElement.style.position !== 'relative'){
            this.elementRef.nativeElement.style.position = 'relative';
          }
          // this.elementRef.nativeElement.style.top = (this.initialTop + (window.scrollY-this.initialYScroll) * this.parallaxRatio) + 'px';
          this.elementRef.nativeElement.style.transform = `translateY(${(window.window.scrollY || window.pageYOffset) * this.parallaxRatio}px)`;
        }
        else if(this.previousPartName === '') { //Last part
            if(this.elementRef.nativeElement.style.position !== 'sticky'){
              this.elementRef.nativeElement.style.position = 'sticky';
              this.elementRef.nativeElement.style.top = position.top + 'px';
              this.elementRef.nativeElement.style.left = '0px';
              this.elementRef.nativeElement.style.right = '0px';
          }
        }
        else if(this.previousPart !== null && this.isIntersecting(this.elementRef.nativeElement,this.topParallaxPart)){ //Middle parts
          if(this.elementRef.nativeElement.style.display !== 'none'){
            this.elementRef.nativeElement.style.display = 'none';
          }
          if (this.nextPart !== null){
            var element = this.elementRef.nativeElement.querySelector('.parallax-image') as HTMLElement;
            if(element !== null){
              this.previousPart.appendChild(element);
          }
          }
        }
        else{
          if(this.elementRef.nativeElement.style.display !== 'block'){
            this.elementRef.nativeElement.style.display = 'block';
          }
          if (this.nextPart !== null){
            var element = this.elementRef.nativeElement.querySelector('.parallax-image') as HTMLElement;
            if(element !== null){
              this.previousPart?.removeChild(element);
          }
          }
          this.elementRef.nativeElement.style.transform = `translateY(${0}px)`;
        }
        // Check if the element is in the middle of the screen
        // if (middleOfImage <= this.middleOfPart) {

        // }
        // else{
        //   if(this.elementRef.nativeElement.style.position !== 'sticky'){
        //     this.elementRef.nativeElement.style.position = 'sticky';
        //     elementReference.nativeElement.style.top = position.top + 'px';
        //     elementReference.nativeElement.style.left = '0px';
        //     elementReference.nativeElement.style.right = '0px';
        //   }
        // }

      }
    } catch (error) {
      console.log(error);
    }
  }
}
}
