import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { MainPageModule } from './main-page/main-page.module';
import { AcademyModule } from './academy/academy.module';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { FormsModule } from '@angular/forms';
import { AccountModule } from './account/account.module';
import { MasterAccountModule } from './master-page/master-account.module';
import { ErrorsExampleComponent } from './errors-example/errors-example.component';
import { SignalRService } from '../core/services/signal-r.service';


@NgModule({

  declarations: [
    SignInComponent,
    ErrorsExampleComponent,
  ],
  imports: [
    CommonModule,
    AccountModule,
    AcademyModule,
    MainPageModule,
    MasterAccountModule,
    FormsModule,
    ChartModule,
    MenuModule,
    TableModule,
    StyleClassModule,
    PanelMenuModule,
    ButtonModule
  ],
  exports: [
    SignInComponent
  ],
  providers: [SignalRService],
})
export class FeatureModule { }
