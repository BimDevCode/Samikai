import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, EventEmitter, Output, OnDestroy, OnInit, PLATFORM_ID, Inject } from '@angular/core';

@Directive({
  selector: '[appIntersectionObserver]'
})
export class IntersectionObserverDirective implements OnInit, OnDestroy {
  private observer!: IntersectionObserver;
  @Output() intersectionVisible: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private elementRef: ElementRef, @Inject(PLATFORM_ID) private platformId: Object, @Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)) {

    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.intersectionVisible.emit(true);
        } else {
          this.intersectionVisible.emit(false);
        }
      });
    }, { threshold: 0.1 }); // Adjust the threshold as needed

    this.observer.observe(this.elementRef.nativeElement);
    }

  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

