import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { ArticleEntity } from '../models/articleEntity';
import { Technology } from '../models/technology';
import { Tag } from '../models/tag';
import { Pagination } from '../models-shared/pagination';
import { ArticleSpecParams } from '../models/articleSpecParams';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { TreeNode } from 'primeng/api';
import { Reaction } from '../models/enums/reaction';
import { ReactionDto } from '../models/reaction.model';

@Injectable({
  providedIn: 'root'
})
export class AcademyService {
  readonly academyControllerUrl = 'articles/';
  readonly reactionsControllerUrl = 'reactions/';
  readonly tagsControllerUrl = this.academyControllerUrl + 'AllTags';
  readonly pathsControllerUrl = this.academyControllerUrl + 'AllPaths';
  readonly technologiesControllerUrl = this.academyControllerUrl + 'AllTechnologies';
  readonly reactionsUrl = this.reactionsControllerUrl + 'ReactedOnArticle';


  baseUrl = environment.apiUrl;
  clientUrl = environment.clientRoot;
  articleEntities: ArticleEntity[] = [];
  technologies: Technology[] = [];
  tags: Tag[] = [];
  paths: string[] = [];
  pagination?: Pagination<ArticleEntity[]>;
  articleParameters = new ArticleSpecParams();
  private _сacheArticle = new Map<string, Pagination<ArticleEntity[]>>();
  get сacheArticle(): Map<string, Pagination<ArticleEntity[]>>{
    return this._сacheArticle;
  }
  set сacheArticle(value: Map<string, Pagination<ArticleEntity[]>>) {
    if (value) {
      this._сacheArticle = value;
    }
    else{
      this._сacheArticle = new Map();
    }
  }

  tagsDict!: { [key: string]: number; };

  constructor(private http: HttpClient) { }

  setArticleParameters(params: ArticleSpecParams) {
    this.articleParameters = params;
  }

  getArticleParameters(): ArticleSpecParams {
    return this.articleParameters;
  }

  getArticleEntities(useCache = true): Observable<Pagination<ArticleEntity[]>> {
    if (!useCache) {
      this.сacheArticle = new Map();
    }
    if (this.сacheArticle.size > 0 && useCache) {
      if (this.сacheArticle.has(Object.values(this.articleParameters).join('-'))) {
        this.pagination = this.сacheArticle.get(Object.values(this.articleParameters).join('-'));
        if(this.pagination)
          return of(this.pagination);
      }
    }

    let params = new HttpParams();
    let headers = new Headers();
    headers.append('Origin', this.clientUrl);
    if (this.articleParameters.technologyId > 0) params = params.append('technologyId', this.articleParameters.technologyId);
    if (this.articleParameters.tagId > 0) params = params.append('tagId', this.articleParameters.tagId);
    params = params.append('sort', this.articleParameters.sort);
    params = params.append('tagName', this.articleParameters.tagName);
    params = params.append('pageIndex', this.articleParameters.pageIndex);
    params = params.append('pageSize', this.articleParameters.pageSize);
    if (this.articleParameters.search) params = params.append('search', this.articleParameters.search);
    return this.http.get<Pagination<ArticleEntity[]>>(this.baseUrl + this.academyControllerUrl, {
      params : params,
    }).pipe(
      map(response => {
        this.сacheArticle.set(Object.values(this.articleParameters).join('-'), response)
        this.pagination = response;
        return response;
      })
    )
  }

  getArticleEntitiesByUserName(userName: string): Observable<ArticleEntity[]> {
    let headers = new Headers();
    headers.append('Origin', this.clientUrl);
    return this.http.get<ArticleEntity[]>(this.baseUrl + this.academyControllerUrl +"UserName/" +userName).pipe(
      map(response => {
        return response;
      })
    )
  }

  getTreePathNodes(treePaths: string[],tags: Tag[]): TreeNode[] {
    this.tagsDict = tags.reduce((dict, tag) => {
      dict[tag.name] = tag.id;
      return dict;
    }, {} as { [key: string]: number });
    const rootNode: TreeNode = {
      label: 'root',
      data: 0,
      children: []
    };

    for (const path of treePaths) {
      const pathParts = path.split('/');//For MacOS
      //const pathParts = path.split('\\');
      let currentSubTree = rootNode;

      for (let part of pathParts) {
        part = part.replace('.md','')
        let childNode = currentSubTree.children?.find(child => child.label === part);
        let dataNode = this.tagsDict[part] ?? part;
        if (!childNode) {
          childNode = {
            label: part,
            data: dataNode,
            children: []
          };
          if (!currentSubTree.children) {
            currentSubTree.children = [];
          }
          currentSubTree.children.push(childNode);
        }

        currentSubTree = childNode;
      }
    }
    return rootNode.children || [];
    }

  getArticle(id: number) {
    //TODO: add cache for article
    return this.http.get<ArticleEntity>(this.baseUrl + this.academyControllerUrl + id);
  }

  getArticleByName(name: string) {
    //TODO: add cache for article
    return this.http.get<ArticleEntity>(this.baseUrl + this.academyControllerUrl +"HashId/" + name);
  }

  getTechnologies() : Observable<Technology[]> {
    if (this.technologies.length > 0) return of(this.technologies);
    return this.http.get<Technology[]>(this.baseUrl + this.technologiesControllerUrl).pipe(
      map(technologies => this.technologies = technologies)
    );
  }
  // postReaction(reactionDto: any): Observable<any> {
  //   return this.http.post(`${this.baseUrl}Reactions/PostReaction`, reactionDto);
  // }
  postReaction(reactionDto: ReactionDto) : void{
      if (reactionDto.articleId <= 0 ) return ;
      this.http.request("POST", this.baseUrl + this.reactionsUrl, { body: reactionDto} ).subscribe((response: any) => {
        response;
      }).closed;
  }

  getTags() : Observable<Tag[]> {
    if (this.tags.length > 0) return of(this.tags);
    return this.http.get<Tag[]>(this.baseUrl + this.tagsControllerUrl).pipe(
      map(tags => this.tags = tags)
    );
  }

  setTags(article: ArticleEntity) : void {
    let parts = article.treePath.split('\\');
    if (parts[parts.length - 1].endsWith('.md')) {
      parts.pop();
    }
    article.tags = parts.map((name, index) => {
      let tag = new Tag();
      tag.id = index;
      tag.name = name;
      return tag;
    });;
  }
  getPaths() : Observable<string[]> {
    if (this.paths.length > 0) return of(this.paths);
    return this.http.get<string[]>(this.baseUrl + this.pathsControllerUrl).pipe(
      map(paths => this.paths = paths)
    );
  }
}
