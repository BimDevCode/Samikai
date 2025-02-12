import { Injectable } from '@angular/core';
import { User, UserManager ,SignoutPopupArgs,SigninPopupArgs, PopupWindowParams} from 'oidc-client-ts';
import { environment } from '../../../environments/environment.development';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userManager: UserManager;

  popupWindowParams: PopupWindowParams | undefined;
    user: User | null = null;

  constructor() {
    const settings = {
      authority: environment.stsAuthority,
      client_id: environment.clientId,
      redirect_uri: `${environment.clientRoot}signin-callback`,
      silent_redirect_uri: `${environment.clientRoot}silent-callback.html`,
      post_logout_redirect_uri: `${environment.clientRoot}signin-callback`,
      response_type: 'code',
      scope: environment.clientScope,
      backChannelLogoutUri : `${environment.clientRoot}`,
      enable : `${environment.clientRoot}`,
      usePkce: true,
      disablePKCE: false,
    };

    this.userManager = new UserManager(settings);

    this.popupWindowParams={
      popupWindowFeatures: {
        closePopupWindowAfterInSeconds: 1,
        menubar: 'true',
        toolbar: 'true',
      },
    };
    this.userManager.events.addUserSignedOut(() => {
      console.log('User signed out');
      this.user = null;
      this.handleUserLogout();
    });

    this.userManager.events.addUserLoaded(user => {
      console.log('User loaded', user);
      this.user = user;
    });

    this.userManager.events.addAccessTokenExpired(() => {
      console.log('Access token expired');
      this.user = null;
      this.handleUserLogout();
    });

    this.userManager.events.addAccessTokenExpiring(() => {
      console.log('Access token expiring');
      // Optionally, you can handle token renewal here
    });
  }

  async signinRedirect(): Promise<void> {
    await this.userManager.signinRedirect();
  }

  async signinRedirectCallback(): Promise<void> {
    await this.userManager.signinRedirectCallback();
  }

  async signoutRedirect(): Promise<void> {
    await this.userManager.signoutRedirect();
  }

  async signoutRedirectCallback(): Promise<void> {
    await this.userManager.signoutRedirectCallback();
  }

  private handleUserLogout(): void {
    // Handle user logout
    // For example, redirect to the login page or show a logout message
    window.location.href = '/';
  }
  updateUser(user: User): Promise<Observable<void | null>> {
    return this.userManager.storeUser(user)
    .then((user) => {
      return of(null);
    }).catch((err) => {
      return of(null);
      // Handle error if needed
    });
  }

  getUser(): Promise<User | null> {
    this.userManager.getUser().then(user => {
      return user;
    });
    return this.userManager.getUser();
  }

  login(): Promise<User| null> {
    this.getLoaded();
    return this.userManager.signinPopup();
  }

  getLoaded(): void{
    this.userManager.events.addUserLoaded((x) => {
      console.log('User loaded' + x);
    });
  }

  renewToken(): Promise<User | null> {
    return this.userManager.signinSilent();
  }

  logout(): Promise<void> {
    return this.userManager
    .signoutRedirect().then(() => {
      this.user = null;
      this.handleUserLogout();
      return;
    });
  }

}
