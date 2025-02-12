import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamComponent } from './team.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    TeamComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class TeamModule { }
