import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AcademyService } from '../../../core/services/academy.service';
import { ArticleSpecParams } from '../../../core/models/articleSpecParams';
import { ArticleEntity } from '../../../core/models/articleEntity';
import { Tag } from '../../../core/models/tag';
import { Technology } from '../../../core/models/technology';
import { Pagination } from '../../../core/models-shared/pagination';
import { FormGroup } from '@angular/forms';
import { MessageService, SelectItem, TreeNode } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { DataView } from 'primeng/dataview';

@Component({
  selector: 'app-article-observing',
  templateUrl: './article-observing.component.html',
  styleUrl: './article-observing.component.scss',
  providers: [MessageService]
})
export class ArticleObservingComponent implements OnInit {
  hideButtonText : string = 'Hide Sort';
  showButtonText : string = 'Show Sort';
  buttonText = this.hideButtonText;
  @ViewChild('search') searchTerm?: ElementRef;
  // isCollapsed = false;
  // isMobile= true;
  nodes!: any[];
  formGroup!: FormGroup;

  selectedNodes!: TreeNode;
  articleEntities: ArticleEntity[] = [];
  technologies: Technology[] = [];
  tags: Tag[] = [];
  sortOrder: number = 0;
  sortField: string = 'createDateTime';
  pagination?: Pagination<ArticleEntity[]>;
  articleParameters = new ArticleSpecParams();
  first: number = 0;
  private _rows: number = 14; 
  selectedFilter: string = 'No Tag';
  get rows(): number { // replace 'any' with the actual type of 'rows'
    return this._rows;
  }
  
  set rows(value: number) { // replace 'any' with the actual type of 'rows'
    this._rows = value;
    // The property 'rows' has changed. You can add your code here.
  }
  sortOptions = [
    {label: 'Older Data', value: 'dateAsc'},
    {label: 'Earlier Data', value: 'dateDesc'},
    {label: 'Name', value: 'default'},
  ];
  totalCount = 1000;
  visible: any;

  constructor(private academyService: AcademyService,
    private messageService: MessageService,
    private route: ActivatedRoute
    ) {
    
  }

  onPageChange(event: any) {
    // if(event instanceof PageEvent )
      this.first = event.first;
      this.rows = event.rows;
      const params = this.academyService.getArticleParameters();
      if (params.pageIndex !== event.page + 1) {
        params.pageIndex = event.page + 1;
        this.academyService.setArticleParameters(params);
        this.articleParameters = params;
        this.getArticles();
      }
  }

  ngOnInit(): void {
    this.articleParameters = this.academyService.getArticleParameters();

    let tagName = JSON.parse(this.route.snapshot.paramMap.get('data') || '{}');
    if (tagName.length > 0) {
      this.nodeSelect(tagName);
    }

    this.getArticles();
    this.getPaths();
    this.getTechnologies();
  }


  toggleMenu() {
    this.visible = !this.visible;
    this.buttonText = this.buttonText === this.showButtonText ? this.hideButtonText:this.showButtonText  ;
  }

  getArticles() {
    this.academyService.getArticleEntities(true).subscribe({
      next: response => {
        this.articleEntities = response.data;
        this.articleEntities.forEach((article) => {this.academyService.setTags(article)});
        this.totalCount = response.count;
      },
      error: error => console.log(error)
    })
  }
  getPaths() {
    this.getTags();
    this.academyService.getPaths().subscribe({
      next: response => {
        this.nodes = this.academyService.getTreePathNodes(response, this.tags);
      },
      error: error => console.log(error)
    })
  }

  getTags() {
    try {
      this.academyService.getTags().subscribe({
        next: response => this.tags = [{id: 0, name: 'All', description: ''}, ...response],
        error: error => console.log(error)
      })
    } catch (error) {
    }
  }

  getTechnologies() {
    this.academyService.getTechnologies().subscribe({
      next: response => this.technologies = [{id: 0, name: 'All', description: ''}, ...response],
      error: error => console.log(error)
    })
  }

  onTechnologySelected(technologyId: number) {
    const params = this.academyService.getArticleParameters();
    params.technologyId = technologyId;
    params.pageIndex = 1;
    this.academyService.setArticleParameters(params);
    this.articleParameters = params;
    this.getArticles();
  }

  onSortSelected(event: any) {
    const params = this.academyService.getArticleParameters();
    params.sort = event.value;
    this.academyService.setArticleParameters(params);
    this.articleParameters = params;
    this.getArticles();
  }

  onReset() {
    if (this.searchTerm) this.searchTerm.nativeElement.value = '';
    this.articleParameters = new ArticleSpecParams();
    this.academyService.setArticleParameters(this.articleParameters);
    this.getArticles();
  }

  nodeSelect(event: any) {
      if(event.node === undefined ) return;
      this.messageService.add({key: 'prod', severity: 'info', summary: 'Tag Selected', detail: event.node.label });
      this.getArticlesByTagName(event.node.label, event.node.data);
  }

  getArticlesByTagName(tagName: string , selectedTagData: any = null) {
    this.selectedFilter =  tagName;
    if (typeof selectedTagData === 'string') {
      selectedTagData = this.academyService.tagsDict[selectedTagData];
    }
    const params = this.academyService.getArticleParameters();
    params.tagId = selectedTagData;
    params.tagName = tagName;
    this.academyService.setArticleParameters(params);
    this.articleParameters = params;
    this.getArticles();
  }
  nodeUnselect(event: any) {
    this.messageService.add({ key: 'prod', severity: 'info', summary: 'Tag Unselected', detail: event.node.label });
    const params = this.academyService.getArticleParameters();
    params.tagName = '';
    this.academyService.setArticleParameters(params);
    this.articleParameters = params;
    this.getArticles();
    this.selectedFilter = 'No Tag'
  }

  onSortChange(event: any) {
      const value = event.value;
      if (value.indexOf('!') === 0) {
          this.sortOrder = -1;
          this.sortField = value.substring(1, value.length);
          this.sortField = value.substring(1, value.length);
      } else {
          this.sortOrder = 1;
          this.sortField = value;
      }
  }

  onFilter(dv: DataView, event: Event) {
      const searchCriteria = (event.target as HTMLInputElement).value;
      const params = this.academyService.getArticleParameters();
      params.search = searchCriteria;
      params.pageIndex = 1;
      this.academyService.setArticleParameters(params);
      this.articleParameters = params;
      this.academyService.getArticleEntities().subscribe({
        next: response => {
          this.articleEntities = response.data;
          this.articleEntities.forEach((article) => {this.academyService.setTags(article)});
          this.totalCount = response.count;
        },
        error: error => console.log(error)
      })
      
  }
}
