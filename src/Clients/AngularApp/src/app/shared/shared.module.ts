import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { CardContentComponent } from './card-content/card-content.component';
import { PageContentComponent } from './pager/page-content/page-content.component';
import { PageHeaderComponent } from './pager/page-header/page-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownButtonComponent } from './dropdown-button/dropdown-button.component';
import { CarouselComponent } from './carousel/carousel.component';
import { SanitizeHtmlPipe } from './sanitize-html.pipe';
import { ToastModule } from 'primeng/toast';
import { DividerModule } from 'primeng/divider';
import { AccountChipComponent } from './account/account-chip/account-chip.component';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ButtonModule } from 'primeng/button';
import { CopyCodeComponent } from './copy-code/copy-code.component';
import { RouterOutlet } from '@angular/router';
import { TextParagraphComponent } from './text-paragraph/text-paragraph.component';
import { CommentComponent } from './comment/comment.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [ //Connected to core.module.ts
    FooterComponent,
    CardContentComponent,
    PageContentComponent,
    PageHeaderComponent,
    DropdownButtonComponent,
    CarouselComponent,
    SanitizeHtmlPipe,
    AccountChipComponent,
    CopyCodeComponent,
    TextParagraphComponent,
    CommentComponent
  ],
  imports: [
    ToastModule,//.forRoot(),
    ReactiveFormsModule,
    AvatarGroupModule,
    AvatarModule,
    ButtonModule,
    FormsModule,
    RouterOutlet,
    CommonModule,
		InputTextareaModule,
    InputTextModule,
    RouterModule,
    DividerModule
  ],
  exports: [ //Connected to core.module.ts
    AvatarGroupModule,
    AvatarModule,
    CommonModule,
    PageContentComponent,
    CopyCodeComponent,
    DividerModule,
    PageHeaderComponent,
    ReactiveFormsModule,
    RouterOutlet,
    FooterComponent,
    ToastModule,
    ButtonModule,
    CardContentComponent,
    DropdownButtonComponent,
    CarouselComponent,
    AccountChipComponent,
    SanitizeHtmlPipe,
    TextParagraphComponent,
    CommentComponent
    ]
})
export class SharedModule { }
