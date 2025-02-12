import { NgModule } from '@angular/core';
import { UserComponent } from './user/user.component';
import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account-routing.module';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { SharedModule } from '../../shared/shared.module';
import { FieldsetModule } from 'primeng/fieldset';
import { SettingsComponent } from './settings/settings.component';
import { MessagesComponent } from './messages/messages.component';
import { WallComponent } from './wall/wall.component';
import { SubUsersComponent } from './sub-users/sub-users.component';
import { ProjectsComponent } from './projects/projects.component';
import { CommentsComponent } from './comments/comments.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
@NgModule({
  declarations: [
    UserComponent,
    AccountComponent,
    SettingsComponent,
    MessagesComponent,
    WallComponent,
    SubUsersComponent,
    ProjectsComponent,
    CommentsComponent
  ],
  imports: [
    TieredMenuModule,
    FieldsetModule,
    AccountRoutingModule,
		FormsModule,
    InputTextModule,
    CalendarModule,
    SharedModule
  ],
  exports: [
    SharedModule,
		FormsModule  ]
})
export class AccountModule { }
