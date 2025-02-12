import { AfterViewInit, Component, ElementRef, HostBinding, Renderer2, Input, ViewChild, OnInit, Output, EventEmitter, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { ArticleEntity } from '../../../core/models/articleEntity';
import { RandomColorService } from '../../../core/random-color.service copy';
import { AcademyService } from '../../../core/services/academy.service';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-article-card-item',
  templateUrl: './article-card-item.component.html',
  styleUrl: './article-card-item.component.scss'
})
  export class ArticleCardItemComponent implements AfterViewInit, OnInit{
  getRandomNumber(): number  {
    return Math.random();
  }

  private _article?: ArticleEntity;
  @ViewChild('imgCard') imgCard?: ElementRef;
  @Input()
  get article(): ArticleEntity | undefined {
    return this._article;
  }

  set article(value: ArticleEntity | undefined) {
    if (value && value.id > 0) {
      this._article = value;
    }
  }
  get tagNames(): string[] {
    if(this._article === undefined || this._article?.tags === undefined ) return [];
    return this._article?.tags.map(tag => tag.name) || [];
  }
  @ViewChild('card') card!: ElementRef;
  @ViewChild('articleCard') articleCard!: ElementRef;
  isSmallCard = false;
  constructor(private randomColorService: RandomColorService, 
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router ) {}
  ngOnInit(): void {
    this.checkCardSize();
    
  }
  @Output() nodeSelected = new EventEmitter<any>();

  @HostListener('window:resize', ['$event'])
  onResize(event: { target: { innerWidth: number; }; }) {
    
    this.checkCardSize();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId) && this.card !== undefined && this.card.nativeElement !== undefined) {
        this.renderer.setStyle( this.card.nativeElement, 'border-color', this.randomColorService.getRandomColor());
        if(this.imgCard !== undefined && this.imgCard.nativeElement !== undefined){
          var imgSrc =  "https://picsum.photos/1500/400/?random=" + this.getRandomNumber();
          this.imgCard.nativeElement.src = imgSrc;
        }
    }
  }
  checkCardSize() {
    if (isPlatformBrowser(this.platformId) && this.card !== undefined && this.card.nativeElement !== undefined) {
      this.isSmallCard = this.articleCard.nativeElement.offsetWidth < 30 * 16; // 10rem assuming 1rem = 16px
    }
  }
  onTagSelected($event: any) {
    let eventNode = { node: { label: '', data: '' } };
    eventNode.node.label = $event.target.innerText;
    eventNode.node.data = $event.target.innerText;
    this.nodeSelected.emit(eventNode);
  }
  routeToArticle() {
    this.router.navigate(['/academy/', this._article?.id]);
  }
}
