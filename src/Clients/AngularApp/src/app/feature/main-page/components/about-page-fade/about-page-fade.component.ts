import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { gsap } from "gsap";
import { CSSPlugin } from 'gsap/CSSPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
    selector: 'about-page-fade',
    templateUrl: './about-page-fade.component.html',
    styleUrl: './about-page-fade.component.scss'
})
export class AboutPageFadeComponent implements OnInit{
  constructor(private elementRef: ElementRef, @Inject(PLATFORM_ID) private platformId: Object, @Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(CSSPlugin, ScrollTrigger);
    }
  }

  fadeInOnScrollLeft(visible: boolean): void {
    const element = this.elementRef.nativeElement.querySelector('.fade-in-element-left');
    if (visible) {
      gsap.fromTo(
        element,
        { opacity: element.style.opacity, x: -80 }, // Start from left (-50px)
        {
          opacity: 1,
          x: 0, // Move to center
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
        { opacity:  element.style.opacity, x: 0 }, 
        {
          opacity: 0,
          x: -80, // Move to center
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
  fadeInOnScrollRight(visible: boolean): void {
    const element = this.elementRef.nativeElement.querySelector('.fade-in-element-right');
    if (visible) {
      gsap.fromTo(
        element,
        { opacity: element.style.opacity, x: 80 }, // Start from left (-50px)
        {
          opacity: 1,
          x: 0, // Move to center
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
        { opacity:  element.style.opacity, x: 0 }, 
        {
          opacity: 0,
          x: 80, // Move to center
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
  fadeInOnScrollRight1(visible: boolean): void {
    const element = this.elementRef.nativeElement.querySelector('.fade-in-element-right1');
    if (visible) {
      gsap.fromTo(
        element,
        { opacity: element.style.opacity, x: 80 }, // Start from left (-50px)
        {
          opacity: 1,
          x: 0, // Move to center
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
        { opacity:  element.style.opacity, x: 0 }, 
        {
          opacity: 0,
          x: 80, // Move to center
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
