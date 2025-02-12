import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { SharedModule } from '../../shared/shared.module';
import { IntroComponent } from './components/intro/intro.component';
import { AncientGreekPartComponent } from './components/ancient-greek-part/ancient-greek-part.component';
import { NextStepPartComponent } from './components/next-step-part/next-step-part.component';
import { ParallaxADirective } from './components/parallax-a.directive';
import { CardCarouselComponent } from './components/card-carousel/card-carousel.component';
import { AboutPageFadeComponent } from './components/about-page-fade/about-page-fade.component';
import { IntersectionObserverDirective } from '../../directives/intersection-observer.directive';
import { MainPageRoutingModule } from './main-page-routing.module';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    MainPageComponent,
    IntroComponent,
    AncientGreekPartComponent,
    NextStepPartComponent,
    ParallaxADirective,
    IntersectionObserverDirective,
    CardCarouselComponent,
    AboutPageFadeComponent
  ],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    ButtonModule,
    SharedModule
  ],
  exports: [
    MainPageComponent,
    IntroComponent,
    AncientGreekPartComponent,
    NextStepPartComponent,
    IntersectionObserverDirective,
    ParallaxADirective
  ]
})
export class MainPageModule { }
