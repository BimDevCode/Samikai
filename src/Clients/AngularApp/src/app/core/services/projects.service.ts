import { Injectable } from '@angular/core';
import { IProject, Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  selectedProject: Project | undefined;
  projects: Project[] = [];

  constructor() { }

  public getProjects(): Project[] {
    return this.projects = [{
      id: 1,
      name: 'Web Application',
      representArticle: {
        id: 23001, name: "Web Application",
        createDateTime: (new Date()).toISOString(),
        texts: [],
        codeSnippets: [],
        contentTypeSequence: [],
        tags: [],
        relevantScore: 0,
        treePath: '',
        authorNameSurname: 'Mikalai Sabaleuski',
        liked: 0,
        disliked: 0,
        comments: []
      },
      route: 'web',
      gitLink: 'https://github.com/BimDevCode/Conbent',
      category: 'Web',
      tag: { id: 0, name: "", description: "" },

      image: 'assets/images/conbent.png',
      text:
      "This is the project you're on right now. Web application which in its essence is a demonstration of modern development technologies. As unfortunately many projects after their completion are hidden property of the company for which this application was written, we have no right to disclose sensetiv details of the project and technologies. However, by writing this solution we give an answer to the question why we need this application - To show our ability to solve complex problems using advanced technologies without violating legal rules. This application uses as key technologies - .NET Microservices, Identity Server, RabbitMQ, PostgreSQL, Angunal, Docker, Kubernetes, Azure."
      ,
      description: 'This is a web application project of current application for working with projects and tasks. It is a single page application with Angular 9 and .NET Core 3.1',
    },
    {
      id: 2,
      name: 'Desktop App',
      representArticle: {
        id: 23002, name: "Desktop App",
        createDateTime: (new Date()).toISOString(),
        texts: [],
        codeSnippets: [],
        contentTypeSequence: [],
        tags: [],
        relevantScore: 0,
        treePath: '',
        authorNameSurname: 'Mikalai Sabaleuski',
        liked: 0,
        disliked: 0,
        comments: []
      },
      gitLink: 'https://github.com/BimDevCode/-WPF-SheetWork_RevitAddin',
      route: 'wpf',
      tag: { id: 0, name: "", description: "" },
      category: 'Desktop',
      image: 'assets/images/desktopProject.png',
      text:`This application is created on WPF using Revit API and represents the simplest example of developing a working add-in application for Autodesk Revit application (engineer design and construction documentation tool).

      Application interacts with the Sheets (Autodesk Revit elements - it is a representation of paper sheets containing drawings and tables required for construction)`,
      description: 'Desktop application that represent style and MVVM technoloigy on the example of addin application',
    },
    {
      id: 3,
      representArticle: {
        id: 23003, name: "Bridge Construtor",
        createDateTime: (new Date()).toISOString(),
        texts: [],
        codeSnippets: [],
        contentTypeSequence: [],
        tags: [],
        relevantScore: 0,
        treePath: '',
        authorNameSurname: 'Mikalai Sabaleuski',
        liked: 0,
        disliked: 0,
        comments: []
      },
      name: 'Bridge Construtor (In Development)',
      route: 'bridge',
      gitLink: '',
      category: 'InDevelopment Web',
      tag: { id: 0, name: "", description: "" },
      image: 'assets/images/bridgeProject.jpg',
      text: `Model Builder Revit, which allows you to build a girder bridge on the initial data - the height of the bridge span, the width of the roadway, the presence of a pedestrian zone, etc. . Now the project is at the stage of assembling the geometry, but it is very necessary to find a specialist in regulatory documentation. `,
      description: "Applicatoion that allows you to generate with European Design Standarts BIM model in Autodesk Revit for Beam Type Bridge by providing required parameteres",
    },
    {
      id: 4,
      name: 'Sauron Project Monitor (In Development)',
      representArticle: {
        id: 23004, name: "Sauron Project Monitor",
        createDateTime: (new Date()).toISOString(),
        texts: [],
        codeSnippets: [],
        contentTypeSequence: [],
        tags: [],
        relevantScore: 0,
        treePath: '',
        authorNameSurname: 'Mikalai Sabaleuski',
        liked: 0,
        disliked: 0,
        comments: []
      },
      gitLink: '',
      route: 'project-monitor',
      tag: { id: 0, name: "", description: "" },
      category: 'InDevelopment Desktop Web',
      image: 'assets/images/sauron.jpeg',
      text:`The project is intended for frequent monitoring of data changes in the Revit model (monitoring of changes in user and system parameters).
      In case of changes in the model of a certain element it is possible to sign a notification.
      Also there is a check of newly created parameters for certain rules
      All this is summarised in a project in which it is possible to understand how the model was created and to roll back on changes.
      `,
      description: 'Desktop ans web application that allows you to save all Autodesk Revit Project data fruqently and been notified if element were changed with custom rules supporting each time checking changed model on a custom company standarts',
    },];
  }
  public getProject(name:string): Project {
    if(this.projects.length === 0){
      this.getProjects();
    }
    return this.projects.find(p => p.name === name) || new Project();
  }
}
