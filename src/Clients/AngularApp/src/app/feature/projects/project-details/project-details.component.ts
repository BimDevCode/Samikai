import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { Project } from '../../../core/models/project';
import { ProjectsService } from '../../../core/services/projects.service';
import { Router } from '@angular/router';
import { ArticleEntity } from '../../../core/models/articleEntity';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss'
})
export class ProjectDetailsComponent implements OnInit{

  project: Project | undefined ;

  constructor(private projectsService: ProjectsService, private router: Router) {
  }


  ngOnInit(): void {
    this.project = this.projectsService.selectedProject;
    if(this.project === undefined) {
      this.project = this.projectsService.getProject("Web Application");
    }
  }

  onTagSelected(tagName: string) {
    this.router.navigate(['academy',{ data: JSON.stringify(tagName) }]);
  }
}
