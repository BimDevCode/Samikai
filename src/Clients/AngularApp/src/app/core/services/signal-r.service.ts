import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection!: HubConnection;
  readonly baseUrl = environment.baseArticleUrl;
  readonly clientUrl = environment.clientRoot;
  readonly ReactionUrl = 'reactionhub';

  public startConnection(): void {
    try {
      var url = this.baseUrl + this.ReactionUrl;
      this.hubConnection = new HubConnectionBuilder()
      .withUrl(url)
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => 
        console.error('Error while starting connection: ' + err));
    } catch (error) {
      console.log(error);
    }
  }

  public addReceiveNotificationListener(onReceiveNotification: (message: string) => void): void {
    this.hubConnection.on('ReceiveReaction', (message: string) => {
      onReceiveNotification(message);
    });
  }

  public sendReaction(articleId: number, reactionType: string): void {
    this.hubConnection.invoke('SendNotification', articleId, reactionType)
      .catch(err => console.error('Error while sending reaction: ' + err));
  }
  public sendMessageReaction(message: string): void {
    this.hubConnection.invoke('SendNotification', message)
      .catch(err => console.error('Error while sending reaction: ' + err));
  }
}