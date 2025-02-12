import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './projects.component';
import { ProjectsObservingComponent } from './projects-observing/projects-observing.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';

const routes: Routes = [
  {path: '',
    component: ProjectsComponent,
  children: [
    { path: '', component: ProjectsObservingComponent },
    { path: ':route', component: ProjectDetailsComponent },

  ]},
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class ProjectsRoutingModule { }
