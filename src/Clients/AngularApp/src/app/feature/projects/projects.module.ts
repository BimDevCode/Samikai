import { NgModule } from '@angular/core';
import { ProjectsComponent } from './projects.component';
import { ProjectsObservingComponent } from './projects-observing/projects-observing.component';
import { SharedModule } from '../../shared/shared.module';
import { DataViewModule } from 'primeng/dataview';
import { ProjectsRoutingModule } from './projects-routing.module';
import { RouterModule } from '@angular/router';
import { ProjectDetailsComponent } from './project-details/project-details.component';

@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectsObservingComponent,
    ProjectDetailsComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    ProjectsRoutingModule,
    DataViewModule,
  ],
  exports: [
    SharedModule,
    DataViewModule,
  ]
})
export class ProjectsModule { }
