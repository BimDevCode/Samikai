import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { IBaseEntity } from '../../core/models/contractors/IBaseEntity';
import { ArticleMetaDataEntity } from '../../core/models/articleMetaDataEntity';
import { Router } from '@angular/router';
import { SignalRService } from '../../core/services/signal-r.service';
import { MessageService } from 'primeng/api';
import { AcademyService } from '../../core/services/academy.service';
import { ArticleEntity } from '../../core/models/articleEntity';


@Component({
  selector: 'app-master-account',
  templateUrl: './master-account.component.html',
  styleUrl: './master-account.component.scss',
})

export class MasterAccountComponent implements OnInit, AfterViewInit{
  masterUserProfile!: AuthorUserProfile;
  shortAuthorName: string = 'MS';
  public message!: string;
  constructor(private router: Router ,
    private messageService: MessageService,
    private signalRService: SignalRService
  ) {}

  ngOnInit(): void {
    this.masterUserProfile = new AuthorUserProfile();
    this.masterUserProfile.authorName = 'Mikalai Sabaleuski';
    this.masterUserProfile.authorEmail = 'email';
    this.masterUserProfile.authorProfile = 'profile';
    this.masterUserProfile.articles = [
    ];
    
    this.masterUserProfile.authorProfileId = 1;
    this.masterUserProfile.authorProfileEmail = 'email';
    this.masterUserProfile.authorProfileName = 'profile';
    this.masterUserProfile.authorId = 1;
    this.masterUserProfile.email = 'email';
    this.masterUserProfile.name = 'Mikalai';
    this.masterUserProfile.surname = 'Sabaleuski';
    this.masterUserProfile.id = 1;
    this.shortAuthorName = this.masterUserProfile.authorName!.split(' ').map(word => word[0].toUpperCase()).join('');
  }
  readonly academyService = inject(AcademyService);

  ngAfterViewInit(): void {
    this.signalRService.startConnection();
    this.signalRService.addReceiveNotificationListener(message => {
      this.messageService.add({ key: 'prod', severity: 'warn', summary: message, detail: message });
      this.message = message;
    });
    this.academyService.getArticleEntitiesByUserName('Mikalai Sabaleuski').subscribe({
      next: response => {
        this.masterUserProfile.articles = response;
      },
      error: error => console.log(error)
    })
  }
  likeArticle(articleId: number): void {
    this.signalRService.sendReaction(articleId, 'Like');
  }

  dislikeArticle(articleId: number): void {
    this.signalRService.sendReaction(articleId, 'Dislike');
  }
  sendMessageArticle(message: string): void {
    this.signalRService.sendMessageReaction(message);
  }

   onArticleRoute(baseEntity: IBaseEntity) {
    this.router.navigate(['/academy', baseEntity.id]);
    }

    onSendNotification() {
      this.message = 'Notification sent';
      this.sendMessageArticle(this.message);
    }
}

class AuthorUserProfile{
  id!: number;
  name!: string;
  articles!: ArticleEntity[];
  surname!: string;
  email!: string;
  authorName!: string;
  authorId!: number;
  authorEmail!: string;
  authorProfile!: string;
  authorProfileId!: number;
  authorProfileEmail!: string;
  authorProfileName!: string;
  gender!: string;
  birthdate!: string;
  address!: string;
  constructor() {
  }
}
