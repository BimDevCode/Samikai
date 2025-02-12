import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { MainPageModule } from './app/feature/main-page/main-page.module';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
