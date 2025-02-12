import { BreakpointObserver } from '@angular/cdk/layout';
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ArticleEntity } from '../../core/models/articleEntity';
import { MenuItem } from 'primeng/api';
import { BreadcrumbService } from '../../core/services/breadcrumb.service';
import { Observable } from 'rxjs';
import { ClipboardService } from 'ngx-clipboard';


@Component({
  selector: 'app-academy',
  templateUrl: './academy.component.html',
  styleUrl: './academy.component.scss'
})
export class AcademyComponent implements OnInit {


  @ViewChild('articleBlock') articleBlock!: ElementRef;
  @ViewChild('aboutBlock') aboutBlock!: ElementRef;
  @ViewChild('aboutHideButton') aboutHideButton!: ElementRef;
  @ViewChild('mainArticleBlock') mainArticleBlock!: ElementRef;
  cookbookImage = "../../../../../assets/images/cookbook.jpg";
  title = 'material-responsive-sidenav';
  hideButtonText : string = 'Hide About';
  showButtonText : string = 'Show About';
  buttonText = this.hideButtonText;

  @ViewChild(RouterOutlet)
  routerOutlet!: RouterOutlet;
  isAboutPostAfterArticles :boolean = false;
  isCollapsed = false;
  isMobile= false;
  itemArticle1: ArticleEntity|undefined = new ArticleEntity();
  itemArticle2: ArticleEntity|undefined = new ArticleEntity();
  itemArticle3: ArticleEntity|undefined = new ArticleEntity();
  home: MenuItem | undefined;
  items$: Observable<MenuItem[]> | undefined;
  items: MenuItem[] | undefined;
  aboutCollapseButton: string = 'Collapse About';
  constructor(private observer: BreakpointObserver,
     private breadcrumbService: BreadcrumbService,
     private clipboardService: ClipboardService,
     private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if(screenSize.matches){
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
    this.breadcrumbService.setBreadcrumbs();//TODO: improve, duplicates if breadcrumbService injects first time
    this.items$ = this.breadcrumbService.getBreadcrumbs();
    this.items$?.subscribe((items) => {
      this.items = items;
    });
    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }
  copyLinkToClipboard($event: MouseEvent) {
    try {
      this.clipboardService.copyFromContent('conbent.it@gmail.com');
    } catch (error) {
      console.log(error);
    }
  }
  toggleMenu() {
    this.buttonText = this.buttonText === this.showButtonText ? this.hideButtonText:this.showButtonText  ;
  }
  moveAboutToDown() {
    if(!this.articleBlock || !this.aboutBlock || !this.aboutHideButton) return;
    if(this.isAboutPostAfterArticles){
      this.renderer.addClass(this.articleBlock.nativeElement, 'md:col-8');
      this.renderer.addClass(this.aboutBlock.nativeElement, 'md:col-4');
      this.aboutCollapseButton = 'Collapse About';
    }
    else{
      this.renderer.removeClass(this.articleBlock.nativeElement, 'md:col-8');
      this.renderer.removeClass(this.aboutBlock.nativeElement, 'md:col-4');
      this.aboutCollapseButton = 'Show About';
    }
    this.isAboutPostAfterArticles = !this.isAboutPostAfterArticles;
    this.renderer.selectRootElement(this.aboutHideButton.nativeElement).blur();
  }
}
