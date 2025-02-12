import { Injectable, Inject } from '@angular/core';

import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import 'prismjs';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/components/prism-csharp';
import '../../../assets/prism/prism.css';
import '../../../assets/prism/prism.js';

declare var Prism: any;
@Injectable()
export class PrismService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  highlightAll() {
    if (isPlatformBrowser(this.platformId)) {
      Prism.highlightAll();
    }
  }
  highlightCode(stringCode: string) {
    if (isPlatformBrowser(this.platformId)) {
      Prism.highlight( stringCode, Prism.languages.csharp, 'csharp');
    }
  }
  highlightElement(HTMLElement: HTMLElement) {
    if (isPlatformBrowser(this.platformId)) {
      Prism.highlightElement(HTMLElement);
    }
  }
  returnLanguages() {
    return Prism.languages;	
  }
}