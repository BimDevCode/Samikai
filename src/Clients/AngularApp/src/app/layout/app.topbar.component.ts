import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { MenuItem, Message, MessageService } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { AuthService } from '../core/services/auth.service';
import { TestApiService } from '../core/services/test-api.service';
import { User } from 'oidc-client-ts';
import { Router } from '@angular/router';
import { BusyService } from '../core/services/busy.service';
@Component({
    selector: 'app-topbar',
    styleUrl: './app.topbar.component.scss',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
      public layoutService: LayoutService, 
      private router: Router, 
      private busyService: BusyService ,
      private messageService: MessageService) {
    }

     readonly authService = inject(AuthService);
     readonly apiService = inject(TestApiService);
   
     messages: string[] = [];
   
     currentUser: User | null = null;
     get currentUserJson(): string {
       return JSON.stringify(this.currentUser, null, 2);
     }
   
     ngOnInit(): void {
       this.authService.getUser().then(user => {
         this.currentUser = user;
         if (user) {
           this.addMessage('User Logged In');
         } else {
           this.addMessage('User Not Logged In');
         }
       }).catch(err => this.addError(err));
       this.authService.userManager.events.addUserSignedOut(() => {
        this.currentUser = null;
       });
     }

     private clearMessages() {
       while (this.messages.length) {
         this.messages.pop();
       }
     }
     private addMessage(msg: string) {
       this.messages.push(msg);
     }
     private addError(msg: string | Error) {
       this.messages.push('Error: ' + (msg instanceof Error ? msg.message : msg));
     }
   
     onLogin() {
       this.clearMessages();
       this.busyService.busy();
       this.authService.login().then(user => {
          this.currentUser = user;
          this.addMessage('User Logged In');
          this.busyService.idle();
       })
       .catch(err => {
         this.addError(err);
         this.showWarnToast("Error", "Error while logging in. Please try again. You will be redirected to the Master Account page.");
         this.toMasterAccount();
         this.busyService.idle();
       });
     }

     showWarnToast(title: string, content: string) {
      this.messageService.add({ key: 'prod', severity: 'warn', summary: title, detail: content });
     }
     onCallAPI() {
       this.clearMessages();
       this.apiService.callApi().then(result => {
         this.addMessage('API Result: ' + JSON.stringify(result));
       }, err => this.addError(err));
     }
   
     onRenewToken() {
       this.clearMessages();
       this.authService.renewToken()
         .then(user => {
           this.currentUser = user;
           this.addMessage('Silent Renew Success');
         })
         .catch(err => this.addError(err));
     }
     
     onLogout() {
       this.busyService.busy();
       this.clearMessages();
       this.currentUser = null;
       this.authService.logout().then(() => {
       }).catch(err => this.addError(err));
       this.busyService.idle();
      }
     
     toMasterAccount(){
      this.router.navigate(['/']);
     }

     refresh(): void {
       console.warn('AppComponent.refresh');
       this.authService.getUser().then(user => {
         this.currentUser = user;
   
         if (user) {
           this.addMessage('User Logged In');
         } else {
           this.addMessage('User Not Logged In');
         }
       }).catch(err => this.addError(err));
     }
}
