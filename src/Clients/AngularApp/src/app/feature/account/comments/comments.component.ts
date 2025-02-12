import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { User } from 'oidc-client-ts';
import { CommentService } from '../../../core/services/comment.service';
import { Observable, Subscribable, of } from 'rxjs';
import { CommentDto } from '../../../core/models/comment.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent implements OnInit {
  currentUser: User | null = null;
 comments$: Observable<CommentDto[]> = new Observable<CommentDto[]>();
  constructor(private authService: AuthService,
    private commentService: CommentService,) {
      this.authService.getUser().then(user => {
        this.currentUser = user;
      });
  }

  ngOnInit(): void {
    this.loadCommentsByUser();
  }

  loadCommentsByUser() {
    var userId = this.currentUser?.profile.sub;
    if (userId) this.commentService.getAllCommentsByUserId(userId).subscribe({
      next: commentsResponse => {
        this.comments$ = of(commentsResponse);
      },
      error: (error: any) =>
        console.log(error)
    });
  }
}
