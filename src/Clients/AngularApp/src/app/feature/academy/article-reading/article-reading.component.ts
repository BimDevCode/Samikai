import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ArticleEntity } from '../../../core/models/articleEntity';
import { AcademyService } from '../../../core/services/academy.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RandomColorService } from '../../../core/random-color.service copy';
import { CardContentComponent } from '../../../shared/card-content/card-content.component';
import { BreadcrumbService } from '../../../core/services/breadcrumb.service';
import { TreeNode } from 'primeng/api';
import { DomSanitizer,SafeHtml } from '@angular/platform-browser';
import { CommentDto } from '../../../core/models/comment.model';
import { AuthService } from '../../../core/services/auth.service';
import { User } from 'oidc-client-ts';
import { Reaction } from '../../../core/models/enums/reaction';
import { ReactionDto } from '../../../core/models/reaction.model';
import { UtilityService } from '../../../core/models/UtilityService';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-article-reading',
  templateUrl: './article-reading.component.html',
  styleUrl: './article-reading.component.scss'
})
export class ArticleReadingComponent implements OnInit {

  private _article?: ArticleEntity;
  currentUser: User | null = null;
  @Input()
  get article(): ArticleEntity {
    return this._article!;
  }
  set article(value: ArticleEntity) {
    if (value && value.id > 0) {
      this._article = value;
    }
  }
  public likeCount: number = 0;
  public createDateTime : string = Date.now().toString();
  public dislikeCount: number = 0;
  public commentCount: number = 0;
  public contentBlocks: any[] = [];
  public comments: CommentDto[] = [];
  public isPreviousExist: boolean = false;
  public _previousName: string = 'previousName';
  public articleName: string = '';
  public _previousId: number = 0;
  public isNextExist: boolean = false;
  public _nextName: string = 'nextName';
  public _nextId: number = 0;

  get tagNames(): string[] {
    if(this._article === undefined || this._article?.tags === undefined ) return [];
    return this._article?.tags.map(tag => tag.name) || [];
  }

  shortAuthorName: string | undefined = 'MS';

  constructor(
    private academyService: AcademyService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private clipboardService: ClipboardService,

    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private breadcrumbService: BreadcrumbService) {
  }
    selectedNode!: TreeNode;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.loadProduct();
      this.breadcrumbService.getBreadcrumbs();
    });

    this.authService.userManager.events.addUserLoaded((user) => {
      this.currentUser = user;
    });
    this.authService.getUser().then(user => {
      this.currentUser = user;
    });
  }
  copyLinkToClipboard($event: MouseEvent) {
    try {
      this.clipboardService.copyFromContent(window.location.href);
    } catch (error) {
      console.log(error);
    }
  }
  loadProduct() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) this.academyService.getArticle(+id).subscribe({
      next: articleResponse => {
          this.article = articleResponse;
          this.likeCount = this.article.liked;
          this.dislikeCount = this.article.disliked ;
          this.commentCount = this.article.comments.length;
          this.article.codeSnippets = this.article.codeSnippets || [];
          if(this.article !== undefined && this.article.id > 0) {
            this.setNextAndPreviousArticleNames(this.article);
          }
          this.shortAuthorName= this.article.authorNameSurname?.split(' ').map(word => word[0].toUpperCase()).join('');
          if(this.article.texts.length == 0) this.article.texts.push('No text found for this article');
          else if(this.article.texts.length > 1 ){
          }
          else if(this.article.texts.length === 1 ){
            this.article.texts = this.divideStringIntoParagraphs(this.article.texts[0], 600);
          }
          this.comments= this.article.comments;
          this.createDateTime = this.article.createDateTime;
          let indexCodeSnippet = 0;
          let indexText = 0;
          this.articleName = this.article.name;
          this.contentBlocks = this.article.contentTypeSequence.map(type => {
            if (type === 'CodeSnippet') {
              indexCodeSnippet++;
              return {
                type: type,
                content: this.article.codeSnippets[indexCodeSnippet - 1].content,
                codeLanguage: this.article.codeSnippets[indexCodeSnippet - 1].codeLanguage
              };
            } else if (type === 'Text') {
              indexText++;
              return {
                type: type,
                content: this.formatText(this.article.texts[indexText - 1])
              };
            }
            return {
              type: 'Undefined',
              content: ''
            };
          });
        },
      error: error =>
        console.log(error)
    });
  }

  onLiked() {
    this.likeCount++;
    const reactionDto: ReactionDto = {
      articleId: this.article.id,
      userId: this.currentUser?.profile.sub || 'Anonymous_' + UtilityService.generateRandomGUID(),
      reaction: "Like"
    };
    this.academyService.postReaction(reactionDto);
  }
  onDisliked() {
    this.dislikeCount++;
    const reactionDto: ReactionDto = {
      articleId: this.article.id,
      userId: this.currentUser?.profile.sub || 'Anonymous_' + UtilityService.generateRandomGUID(),
      reaction: "Dislike"
    };
    this.academyService.postReaction(reactionDto);
  }

  formatText(text: string): string {
    try {
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      return '&nbsp;&nbsp;&nbsp;&nbsp;' + text
      .replace(urlRegex, url => `<a href="${url}" class="underline" target="_blank">${url}</a>`)//replace url with anchor tag
      .replace(/\r?\n/g, '<br>&nbsp;&nbsp;&nbsp;&nbsp;')//replace new line with <br>
      ;
    } catch (error) {
      return 'In Progress';
    }
  }
  setNextAndPreviousArticleNames(article: ArticleEntity) {
    this.academyService.getArticle(article.id+1).subscribe({
      next: articleResponse => {
        if(articleResponse !== undefined && articleResponse.id > 0) {
            this.isNextExist = true;
            this._nextName = 'Next: ' + articleResponse.name;
            this._nextId = articleResponse.id;
          }
        },
      error: error =>
        console.log(error)
    });
    this.academyService.getArticle(article.id-1).subscribe({
      next: articleResponse => {
        if(articleResponse !== undefined && articleResponse.id > 0) {
            this.isPreviousExist = true;
            this._previousName = 'Previous: ' +  articleResponse.name;
            this._previousId = articleResponse.id;
          }
        },
      error: error =>
        console.log(error)
    });
  }

  divideStringIntoParagraphs(input: string, length: number): string[] {
    let result: string[] = [];
    let start = 0;
    let end = length;

    while (start < input.length) {
        end = input.indexOf('.', end);
        if (end === -1) {
            end = input.length;
        } else {
            end += 1; // Include the dot in the paragraph
        }
        result.push(input.substring(start, end));
        start = end;
        end = start + length;
    }
    return result;
  }

  onTagSelected(tagName: string) {
    this.router.navigate(['academy',{ data: JSON.stringify(tagName) }]);
  }
}
