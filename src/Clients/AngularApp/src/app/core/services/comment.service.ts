import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { CommentDto } from '../models/comment.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  readonly commentControllerUrl = 'comments/';
  baseUrl = environment.apiUrl;
  clientUrl = environment.clientRoot;
  pagination?: CommentDto[];
  private _сacheComment = new Map<string, CommentDto[]>();
  comentUserAction: string = 'GetCommentsByUser/';
  get сacheComment(): Map<string, CommentDto[]>{
    return this._сacheComment;
  }
  set сacheComment(value: Map<string, CommentDto[]>) {
    if (value) {
      this._сacheComment = value;
    }
    else{
      this._сacheComment = new Map();
    }
  }
  constructor(private http: HttpClient) {}

  getCommentsByArticleId(postId: number, useCache = true): Observable<CommentDto[]> {
    if (!useCache) {
      this.сacheComment = new Map();
    }
    if (this.сacheComment.size > 0 && useCache) {
      if (this.сacheComment.has(Object.values(postId).join('-'))) {
        this.pagination = this.сacheComment.get(Object.values(postId).join('-'));
        if(this.pagination)
          return of(this.pagination);
      }
    }
    let headers = new Headers();
    headers.append('Origin', this.clientUrl);
    return this.http.get<CommentDto[]>(this.baseUrl + this.commentControllerUrl, {
    }).pipe(
      map(response => {
        this.сacheComment.set(Object.values(postId).join('-'), response)
        this.pagination = response;
        return response;
      })
    )
  }
  
  getAllCommentsByUserId(userId: string, useCache = false): Observable<CommentDto[]> {
    if (!useCache) {
      this.сacheComment = new Map();
    }
    if (this.сacheComment.size > 0 && useCache) {
      if (this.сacheComment.has(Object.values(userId).join('-'))) {
        this.pagination = this.сacheComment.get(Object.values(userId).join('-'));
        if(this.pagination)
          return of(this.pagination);
      }
    }
    let headers = new Headers();
    headers.append('Origin', this.clientUrl);
    return this.http.get<CommentDto[]>(this.baseUrl + this.commentControllerUrl +this.comentUserAction + userId , {
    }).pipe(
      map(response => {
        this.сacheComment.set(Object.values(userId).join('-'), response)
        this.pagination = response;
        return response;
      })
    )
  }

  addComment(comment: CommentDto): Observable<CommentDto> {
    return this.http.post<CommentDto>(this.baseUrl + this.commentControllerUrl, comment);
  }
}