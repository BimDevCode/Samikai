import { Component, OnInit } from '@angular/core';
import { Project } from '../../../core/models/project';
import { ProjectsService } from '../../../core/services/projects.service';

@Component({
  selector: 'app-projects-observing',
  templateUrl: './projects-observing.component.html',
  styleUrl: './projects-observing.component.scss'
})
export class ProjectsObservingComponent implements OnInit{


  projects: Project[] = [];

  constructor(private projectsService: ProjectsService) {
  }

  ngOnInit(): void {
    this.projects = this.projectsService.getProjects();
  }
  onProjectSelected(project: Project) {
    if (this.projectsService.selectedProject !== project && project.route !== '')  {
      this.projectsService.selectedProject = project;
    }
    }

}
