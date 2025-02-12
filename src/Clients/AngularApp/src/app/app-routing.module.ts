import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { SigninCallbackComponent } from './core/components/signin-callback/signin-callback.component';
import { ErrorsExampleComponent } from './feature/errors-example/errors-example.component';

const routes: Routes = [
  { path: '', component: AppLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./feature/main-page/main-page.module').then(m => m.MainPageModule) },
      { path: 'master-account', loadChildren: () => import('./feature/master-page/master-account.module').then(m => m.MasterAccountModule) },
      { path: 'error-example', component: ErrorsExampleComponent},
      { path: 'account', loadChildren: () => import('./feature/account/account.module').then(m => m.AccountModule) },
      { path: 'academy', loadChildren: () => import('./feature/academy/academy.module').then(m => m.AcademyModule) ,data: { breadcrumb: 'Articles'}},
      { path: 'project', loadChildren: () => import('./feature/projects/projects.module').then(m => m.ProjectsModule) },
      { path: 'team', loadChildren: () => import('./feature/team/team.module').then(m => m.TeamModule) },
      { path: 'contact', loadChildren: () => import('./feature/contact/contact.module').then(m => m.ContactModule) },
      { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
      { path: 'dashboard', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
      { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
      { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) },
      { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
      { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
      { path: 'notfound', component: NotfoundComponent},
      { path: 'signin-callback', component: SigninCallbackComponent }
  ]},
]

@NgModule({
  imports: [RouterModule.forRoot(routes,
    { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })],

  exports: [RouterModule]
})
export class AppRoutingModule { }
