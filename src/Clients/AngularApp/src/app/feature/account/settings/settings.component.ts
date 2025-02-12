import { Component, inject } from '@angular/core';
import { User } from 'oidc-client-ts';
import { AuthService } from '../../../core/services/auth.service';
import { Observable } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  mockUser: User = new User({
    id_token: 'your_id_token',
    session_state: 'your_session_state',
    access_token: 'your_access_token',
    refresh_token: 'your_refresh_token',
    token_type: 'your_token_type',
    scope: 'your_scope',
    profile: {
      sub: '1234567890',
      name: 'Mikalai Sabaleuski',
      given_name: 'Mikalai',
      family_name: 'Sbalaeuski',
      preferred_username: 'Sabaleuski',
      email: 'Mikalai.Sabaleuski@example.com',
      picture: 'http://example.com/johndoe.jpg',
      iss: '',
      aud: '',
      exp: 0,
      iat: 0
    },
    expires_at: 1234567890, // example timestamp
    userState: {}, // example userState
    url_state: 'your_url_state'
  });
    currentUser: User = this.mockUser;

  shortAuthorName: string = '';
  isChanged: boolean = false;
  accountName: string | undefined;
  readonly authService = inject(AuthService);
  readonly messageService = inject(MessageService);
  private _birthday!: Date;
  get birthday(): Date {
    return this._birthday;
  }

  set birthday(value: Date) {
    this._birthday = value;
    this.handleChange();
  }

  ngOnInit(): void {
    this.authService.getUser().then(user => {
      this.currentUser = user!;
      if(this.currentUser == null) this.currentUser=this.mockUser;
      var preferedName = user?.profile?.family_name + ' ' + user?.profile?.family_name ;
      this.accountName = preferedName != ' ' ? preferedName: user?.profile?.nickname  ;
      var stringBirthDay = user?.profile?.birthdate ?? '';
      this.birthday =stringBirthDay ===''? new Date(): new Date(stringBirthDay);
      this.shortAuthorName = (this.accountName ?? '').split(' ').map(word => word[0].toUpperCase()).join('');
      this.isChanged = false;
    }).catch(err => {});
  }

  saveChanges(): void{
    this.authService.updateUser(this.currentUser).then(() => {
      this.isChanged = false;
      this.messageService.add({key: 'prod', severity: 'success', summary: 'Successful Saved',  detail: 'Your data for ' + this.currentUser.profile.nickname + ' were Successful Saved', life: 3000  });
    });
  }

  handleChange(): void {
    this.isChanged = true;
  }
}
