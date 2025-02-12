import { NgModule } from '@angular/core';
import { MasterAccountComponent } from './master-account.component';
import { FieldsetModule } from 'primeng/fieldset';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { DataViewModule } from 'primeng/dataview';

const routes: Routes = [
  { path: '', component: MasterAccountComponent },
  // other routes...
];
@NgModule({
  declarations: [
    MasterAccountComponent
  ],
  imports: [
    DataViewModule,
    RouterModule.forChild(routes),
    SharedModule,
    FieldsetModule
  ]
})

export class MasterAccountModule { }
