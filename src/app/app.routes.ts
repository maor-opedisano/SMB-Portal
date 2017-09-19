/**
 * Created by if_found_call_0586288454 on 24/04/2017 ap. J.-C..
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NewUserPasswordComponent } from './new-user-password/new-user-password.component';
import { UserComponent } from './user/user.component';
import { SecurityComponent } from './security/security.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmailComponent } from './email/email.component';
import { AccountComponent } from './account/account.component';
import { AccountGeneralComponent } from './account/account-general/account-general.component';
import { NotificationsComponent } from './account/notifications/notifications.component';
import { BillingComponent } from './account/billing/billing.component';
import { GeneralComponent } from './security/general/general.component';
import { ExceptionComponent } from './security/exception/exception.component';
import { SearchComponent } from './email/search/search.component';
import { ReleaseComponent } from './email/release/release.component';
import { BrowseComponent } from './email/browse/browse.component';
import { FirstTimeUserComponent } from './dashboard/templates/first-time-user/first-time-user.component';
import { UserIsSobAndHasToken } from './shared/route-activators';
import { HelpComponent } from './help/help.component';
import { WrongBrowserComponent } from './wrong-browser/wrong-browser.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'wrong-browser', component: WrongBrowserComponent },
  { path: 'login', component: LoginComponent },

  { path: 'release', component: ReleaseComponent },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [UserIsSobAndHasToken],
    children: [
      { path: 'firstTimeChangePassword', component: NewUserPasswordComponent },
      { path: 'firstTime', component: FirstTimeUserComponent },
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'security', component: SecurityComponent,
        children: [
          { path: '', redirectTo: 'general', pathMatch: 'full' },
          { path: 'general', component: GeneralComponent },
          { path: 'exceptions', component: ExceptionComponent }
        ]
      },
      {
        path: 'emails', component: EmailComponent,
        children: [
          { path: '', redirectTo: 'search', pathMatch: 'full' },
          { path: 'search', component: SearchComponent },
          { path: 'browse', component: BrowseComponent }
        ]
      },
      {
        path: 'account', component: AccountComponent,
        children: [
          { path: '', redirectTo: 'notifications', pathMatch: 'full' },
          { path: 'account', component: AccountGeneralComponent },
          { path: 'notifications', component: NotificationsComponent },
          { path: 'billing', component: BillingComponent },
        ]
      },
      { path: 'help', component: HelpComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
