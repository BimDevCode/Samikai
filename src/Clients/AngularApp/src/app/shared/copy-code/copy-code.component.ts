import { AfterRenderPhase, AfterViewChecked, AfterViewInit, Component, ElementRef, Inject, Input, OnChanges, OnInit, PLATFORM_ID, Renderer2, SimpleChanges, ViewChild, afterNextRender, input } from '@angular/core';
import { PrismService } from '../../core/services/prism.service';
import Prism from 'prismjs';
import { ClipboardService } from 'ngx-clipboard';
import { isPlatformBrowser } from '@angular/common';
import { CodeLanguageEnum } from '../../core/models/enums/codeLanguageEnum';

@Component({
  selector: 'app-copy-code',
  templateUrl: './copy-code.component.html',
  styleUrl: './copy-code.component.scss'
})
export class CopyCodeComponent implements OnInit, AfterViewChecked{
  @ViewChild('codeBlock') codeBlock!: ElementRef;
  highlighted: boolean = false;
  copied: boolean = false;
  @Input() code: string = 
  `public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<ArticleEntity, ArticleDto>()
                .ForMember(d => d.Texts, o 
                    => o.MapFrom(s => s.Texts!.Select(x => x.Content)))
                .ForMember(d => d.AuthorNameSurname, o
                    => o.MapFrom(s => s.Author.Name))
                .ReverseMap();
        }
    }`;
    
  @Input() codeLanguage: CodeLanguageEnum = CodeLanguageEnum.Undefined;
  constructor(
    private prismService: PrismService, 
    @Inject(PLATFORM_ID) private platformId: Object,
    private clipboardService: ClipboardService,
    private renderer: Renderer2) {
    }
  ngOnInit(): void {
    
  }

  ngAfterViewChecked(): void {
    if(this.codeBlock !== undefined && this.codeBlock.nativeElement !== undefined){
      var codeLanguageClass = this.getLanguageClass(this.codeLanguage);
      this.renderer.addClass(this.codeBlock.nativeElement, codeLanguageClass);
    } 
    if (isPlatformBrowser(this.platformId) ) {
      try 
      {
        this.prismService.returnLanguages();
        this.prismService.highlightAll();
      }
      catch (error)
      {
        console.log(error);
      }
    }
  }
  
  copyText() {
    try {
      this.clipboardService.copyFromContent(this.code);
      this.copied = true;
    } catch (error) {
      console.log(error);
    }
  }

  private getLanguageClass(codeLanguage: CodeLanguageEnum): string {
    switch (codeLanguage) {
      case CodeLanguageEnum.JavaScript:
        return 'language-javascript';
      case CodeLanguageEnum.TypeScript:
        return 'language-typescript';
      case CodeLanguageEnum.Python:
        return 'language-python';
      case CodeLanguageEnum.CSharp:
        return 'language-csharp';
      case CodeLanguageEnum.Undefined:
        return 'language-clike';
      default:
        return 'language-clike';
    }
  }
}
