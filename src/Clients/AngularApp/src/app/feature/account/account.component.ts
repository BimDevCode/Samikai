import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { BusyService } from '../../core/services/busy.service';
import { AuthService } from '../../core/services/auth.service';
import { error } from 'console';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit{
  tieredItems: MenuItem[] | undefined;
  ngOnInit(): void {
    this.tieredItems = [
      {
        label: 'Profile',
        icon: 'pi pi-fw pi-user',
        items: [
            {
              label: 'Account Page',
              icon: 'pi pi-fw pi-id-card',
              routerLink: ['/account']
            },
            {
                label: 'Settings',
                icon: 'pi pi-fw pi-cog',
                routerLink: ['/account/settings']
            }
        ]
    },
    // {
    //   label: 'Your Wall',
    //   icon: 'pi pi-fw pi-tablet',
    //   routerLink: ['/account/wall']
    // },
    // {
    //   label: 'Messages',
    //   icon: 'pi pi-fw pi-envelope',
    //   routerLink: ['/account/messages']

    // },
    {
      label: 'Comments',
      icon: 'pi pi-fw pi-comments',
      routerLink: ['/account/comments']
    },
    {
      label: 'Projects (In Development)',
      icon: 'pi pi-fw pi-book',
      routerLink: ['/account/projects'],
      items: [
              {
                label: 'First Project (In Development)',
                icon: 'pi pi-fw pi-plus',
              }
            ]
    },
    {
      label: 'Notifications (In Development)',
      icon: 'pi pi-fw pi-envelope',
      routerLink: ['/account/messages']
    },

    // {
    //     label: 'Sub Users',
    //     icon: 'pi pi-fw pi-sitemap',
    //     routerLink: ['/account/sub-users'],
    //     items: [
    //         {
    //             label: 'New',
    //             icon: 'pi pi-fw pi-plus',
    //             items: [
    //                 {
    //                     label: 'User',
    //                     icon: 'pi pi-fw pi-plus'
    //                 },
    //                 {
    //                     label: 'Duplicate',
    //                     icon: 'pi pi-fw pi-copy'
    //                 },

    //             ]
    //         },
    //         {
    //             label: 'Edit',
    //             icon: 'pi pi-fw pi-user-edit'
    //         }
    //     ]
    // },
      { separator: true },
      {
          label: 'Quit',
          icon: 'pi pi-fw pi-sign-out',
          command: () => {
            this.onLogout();
        }
      }
  ];

  }
  messages: string[] = [];
  constructor(
      private busyService: BusyService ,
      private messageService: MessageService,
      private authService: AuthService) {
  }
  private addError(msg: string | Error) {
    this.showWarnToast("Error", (msg instanceof Error ? msg.message : msg));
  }
  showWarnToast(title: string, content: string) {
    this.messageService.add({ key: 'prod', severity: 'warn', summary: title, detail: content });
   }

  onLogout() {
    this.busyService.busy();
    this.authService.logout().then(() => {
      var url = window.location.href;
    }).catch( (error) => {
      this.addError(error);
    });
    this.busyService.idle();
   }
}
