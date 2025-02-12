import { Component, HostListener, Inject, OnInit, Renderer2 } from '@angular/core';
import $ from 'jquery';//Leave for JS sript
import { ScriptLoaderService } from '../../../../core/script-loader.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss'
})

export class IntroComponent implements OnInit {
  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
    this.animateScript();
    this.loadScript('https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js');
    this.loadScript('../../../../../assets/js/main-page/intro.js');
    this.loadScript('//cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js');
  }

  loadScript(urnName: string){
    const s = this.renderer.createElement('script');
    s.type = 'text/javascript';
    s.src = urnName; // replace with the actual path to your script
    this.renderer.appendChild(this.document.body, s);
  }

  animateScript() {
    this.document.addEventListener("DOMContentLoaded", (event) => {
      this.animationText("#text-anim");
    });


  }

  animationText(element: string): void {
    let newText = "";
    const theText = this.document.querySelector<HTMLElement>(element);
    if (!theText) return; // Guard clause to handle cases where the element is not found
    for (let i = 0; i < theText.innerText.length; i++) {
      newText += "<div style=\"display:inline-block;\">";
      if (theText.innerText[i] == " ") {
        newText += "&nbsp;";
      } else {
        newText += theText.innerText[i];
      }
      newText += "</div>";
    }
    theText.innerHTML = newText;
    const targetsDiv = this.document.querySelectorAll<HTMLElement>(element + " div");
    gsap.timeline().staggerFromTo(
      targetsDiv,
      2,
      {opacity: 0, y: 90},
      {opacity: 1, y: 0, ease: 'bounce.out(1.2, 0.5)'}, 0.03);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    this.parallaxEffect();
  }

  private parallaxEffect(): void {
    const divs = document.querySelectorAll('.parallax-div');
    divs.forEach(div => {
      const speed = div.getAttribute('data-speed');
      if (speed !== null) {
        const speedValue = parseFloat(speed)/10;
        const yOffset = window.scrollY;
        gsap.to(div, { y:(yOffset * speedValue), ease: 'power1.inOut'});
      }
    });
  }
}
