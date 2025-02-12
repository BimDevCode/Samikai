import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleObservingComponent } from './article-observing/article-observing.component';
import { ArticleReadingComponent } from './article-reading/article-reading.component';
import { AcademyComponent } from './academy.component';

const routes: Routes = [
  {path: '',
  component: AcademyComponent,
  children: [
    { path: '', component: ArticleObservingComponent },
    { path: ':id', component: ArticleReadingComponent },
    // more child routes can be added here
  ]},
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
  ]
})

export class AcademyRoutingModule { }
