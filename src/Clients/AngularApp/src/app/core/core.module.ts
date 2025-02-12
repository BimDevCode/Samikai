import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FeatureModule } from '../feature/feature.module';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { SigninCallbackComponent } from './components/signin-callback/signin-callback.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    // Remove SigninCallbackComponent from declarations
  ],
  imports: [
    CommonModule,
    FeatureModule,
    BrowserAnimationsModule,
    NgxSpinnerModule.forRoot({ type: 'ball-newton-cradle' }),
    SharedModule,
    SigninCallbackComponent // Add SigninCallbackComponent to imports
  ],
  exports: [
    NgxSpinnerModule,
    SharedModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CoreModule { }
