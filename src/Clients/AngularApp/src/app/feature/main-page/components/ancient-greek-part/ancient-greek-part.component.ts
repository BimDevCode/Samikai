import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, Renderer2 } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from "gsap";
import $ from 'jquery';//Leave for JS sript


@Component({
  selector: 'app-ancient-greek-part',
  templateUrl: './ancient-greek-part.component.html',
  styleUrl: './ancient-greek-part.component.scss'
})
export class AncientGreekPartComponent implements OnInit {
[x: string]: any;
  imageUrlA = '../../../../../assets/Image/OrderPartA.jpeg';
  imageUrlB = '../../../../../assets/Image/OrderPartB.jpeg';
  imageUrlC = '../../../../../assets/Image/OrderPartC.jpeg';
  imageUrlD = '../../../../../assets/Image/OrderPartD.jpeg';
  imageUrlE = '../../../../../assets/Image/OrderPartE.jpeg';
  imageUrlF = '../../../../../assets/Image/OrderPartF.jpeg';
  imageUrlG = '../../../../../assets/Image/OrderPartG.jpeg';

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private renderer: Renderer2, @Inject(DOCUMENT) private document: Document, private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(
        {
          CSSPlugin
        }
      );
    }
  }
  fadeInOnScroll(visible: boolean, className: string): void {
    const element = this.elementRef.nativeElement.querySelector(className);
    if (visible) {
      gsap.fromTo(
        element,
        { opacity: element.style.opacity}, // Start from left (-50px)
        {
          opacity: 1,
          duration: 2,
          overwrite: "auto", // Add this line to prevent the animation from being overwritten
          scrollTrigger: {
            trigger: element,
            start: 'top 80%', // Adjust this value based on when you want the animation to start
            end: 'bottom 20%', // Adjust this value based on when you want the animation to end
            scrub: true // Smoothing the animation when scrolling
          }
        }
      );
    }
    else {
      gsap.fromTo(
        element,
        { opacity:  element.style.opacity}, 
        {
          opacity: 0,
          duration: 0.5,
          overwrite: "auto", // Add this line to prevent the animation from being overwritten
          scrollTrigger: {
            trigger: element,
            start: 'top 80%', // Adjust this value based on when you want the animation to start
            end: 'bottom 20%', // Adjust this value based on when you want the animation to end
            scrub: true // Smoothing the animation when scrolling
          }
        }
      );
    }
  }
}
