// src/app/components/comment/comment.component.ts
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommentService } from '../../core/services/comment.service';
import { CommentDto } from '../../core/models/comment.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleEntity } from '../../core/models/articleEntity';
import { AuthService } from '../../core/services/auth.service';
import { User } from 'oidc-client-ts';
import { BehaviorSubject } from 'rxjs';
import { UtilityService } from '../../core/models/UtilityService';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit ,OnChanges{
  @Input() postId!: number;
  @Input() commentsCount: number = 0;
  @Output() commentsCountChange = new EventEmitter<number>();
  @Input() article!: ArticleEntity;
  currentUser: User | null = null;
  commentForm: FormGroup;
  comments$ = new BehaviorSubject<CommentDto[]>([]);
  profileName: string = 'Anonimous';
  constructor(
    private commentService: CommentService,
    private authService: AuthService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {

    this.commentForm = this.fb.group({
      author: [this.profileName, Validators.required],
      content: ['', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['article']) {
      this.comments$=new BehaviorSubject<CommentDto[]>(this.article.comments || []);
      this.commentsCount =this.comments$.value.length;
      this.profileName = this.currentUser?.profile?.nickname || ('Anonimous_'+ UtilityService.generateRandomGUID());
    }
  }
  ngOnInit(): void {
    this.authService.userManager.events.addUserLoaded((user) => {
      this.currentUser = user;
      if (user) {
        this.profileName = this.currentUser?.profile?.nickname || ('Anonimous_'+ UtilityService.generateRandomGUID());
      } else {
        this.commentForm = this.fb.group({
          author: [this.profileName, Validators.required],
          content: ['', Validators.required],
        });
      }
    });
    this.authService.userManager.events.addUserSignedOut(() => {
      this.currentUser = null;
      this.commentForm.reset();
    });
    this.authService.getUser().then(user => {
      this.currentUser = user;
      if (user) {
      } else {
        this.commentForm = this.fb.group({
          author: [this.profileName, Validators.required],
          content: ['', Validators.required],
        });
      }
      this.profileName = this.currentUser?.profile?.nickname || ('Anonimous_'+ UtilityService.generateRandomGUID());
    }).catch(err => {
    });


  }

  submitComment(): void {
    var author = this.commentForm.controls['author'];
    if(author.value === '' || author.value === null || author.value === undefined){
      author.setValue(this.currentUser?.profile?.nickname);
    }
    if (this.commentForm.valid) {
      const newComment: CommentDto = {
        id: 0,
        postId: this.article!.id,
        postName: this.article!.name,
        author: this.commentForm.value.author,
        userId: this.currentUser?.profile.sub || '',
        authorId: 0,
        content: this.commentForm.value.content,
        createdAt: new Date(),
      };
      this.commentService.addComment(newComment).subscribe((comment) => {
        this.comments$.next([...this.comments$.value, newComment]);
        this.commentForm.controls['content'].reset();
        this.commentsCountChange.emit(this.comments$.value.length);
      });
    }
  }
}
