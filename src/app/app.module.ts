import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { HttpService, HTTPStateService } from './shared/custom-http';
import { DialogsService, ConfirmDialog } from './shared/dialogs.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmailComponent } from './email/email.component';
import { SearchComponent } from './email/search/search.component';
import { ReleaseComponent } from './email/release/release.component';
import { BrowseComponent } from './email/browse/browse.component';
import { SecurityComponent } from './security/security.component';
import { ExceptionComponent } from './security/exception/exception.component';
import { DeleteExceptionDialog } from './security/exception/templates/templates.component';
import { GeneralComponent } from './security/general/general.component';
import { AccountComponent } from './account/account.component';
import { UserComponent, UserChangePasswordComponent } from './user/user.component';


import {
  GeneralSettingsComponent,
  GeneralSettingsWithCDRComponent,
  GeneralSettingsWithoutCDRComponent,
  SpecialAttachmentsComponent

} from './security/general/templates/templates.components';
import {
  AccountGeneralComponent,
  ChangePasswordModalComponent
} from './account/account-general/account-general.component';
import {
  ExceptionSettingsComponent, ExistingExceptionsComponent,
  NewExceptionComponent
} from './security/exception/templates/templates.component';


import { HighlightDirective } from './shared/attributes.directives';


// routing
import { AppRoutingModule } from './app.routes';
import { ResponseHandlerService } from './shared/response-handler.service';
import { UserIsSobAndHasToken } from './shared/route-activators';
// 3rd libraries
import {
  MatSliderModule,
  MatCheckboxModule,
  MatSlideToggleModule,
  MatSidenavModule,
  MatListModule,
  MatButtonModule,
  MatMenuModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatTooltipModule,
  MatSelectModule

  // MdSelectModule,
  // MdRadioModule,
} from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {
  CovalentLayoutModule,
  CovalentDataTableModule,
  CovalentPagingModule,
  CovalentLoadingModule,
  CovalentFileModule
} from '@covalent/core';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxChartsModule } from '@swimlane/ngx-charts';
// import { default as reducer } from './store/app-store';

// custom pipes

import { DictionaryIteratorPipe, GetPercentagePipe, ArrayLengthPipe, RemainingItemsInArrayPipe } from './shared/pipes';
import { NotificationsComponent } from './account/notifications/notifications.component';
import { BillingComponent, UpdatePlanComponent } from './account/billing/billing.component';
import 'hammerjs';

import { SuccessDialog, ErrorGetDialog, ErrorPostDialog } from './shared/system.dialogs';
// dashboard components
import {
  TotalsTopComponent,
  GraphSelectorComponent,
  GraphComponent,
  PieChartsComponent,
  EmailSectionComponent,
  NewsFeedComponent
} from './dashboard/templates/dashboard-templates/dashboard-templates.component';
import { FirstTimeUserComponent } from './dashboard/templates/first-time-user/first-time-user.component';
import { NewUserPasswordComponent } from './new-user-password/new-user-password.component';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';

// import { DashboardEffects } from './store/effects/dashboard.effects';
// import { DashboardActions } from './store/actions/dashboard.actions';
import { DashboardService } from './dashboard/dashboard.service';
import { HelpComponent } from './help/help.component';
import { WrongBrowserComponent } from './wrong-browser/wrong-browser.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    EmailSectionComponent,
    EmailComponent,
    SearchComponent,
    ReleaseComponent,
    BrowseComponent,
    NewsFeedComponent,
    SecurityComponent,
    ExceptionComponent,
    GeneralComponent,
    AccountComponent,
    UpdatePlanComponent,
    ChangePasswordModalComponent,
    UserChangePasswordComponent,
    SuccessDialog,
    ErrorGetDialog,
    ErrorPostDialog,
    UserComponent,
    GeneralSettingsComponent,
    GeneralSettingsWithCDRComponent,
    SpecialAttachmentsComponent,
    GeneralSettingsWithoutCDRComponent,
    AccountGeneralComponent,
    ExceptionSettingsComponent,
    ExistingExceptionsComponent,
    NewExceptionComponent,
    DictionaryIteratorPipe,
    ArrayLengthPipe,
    RemainingItemsInArrayPipe,
    NotificationsComponent,
    BillingComponent,
    TotalsTopComponent,
    GraphSelectorComponent,
    GraphComponent,
    PieChartsComponent,
    ConfirmDialog,
    DeleteExceptionDialog,
    FirstTimeUserComponent,
    GetPercentagePipe,
    NewUserPasswordComponent,
    HelpComponent,
    WrongBrowserComponent,
    HighlightDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MatSliderModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTooltipModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    // MdRadioModule,
    FlexLayoutModule,
    CovalentPagingModule,
    CovalentLayoutModule,
    CovalentDataTableModule,
    CovalentFileModule,
    CovalentLoadingModule,
    BrowserAnimationsModule,
    // NgxDatatableModule,
    // NgbModule.forRoot(),
     NgxChartsModule
  ],
  providers: [
    {
      provide: HttpService,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions, ResponseHandlerService, HTTPStateService]
    }, ResponseHandlerService, DialogsService,
    UserIsSobAndHasToken,
    DashboardService,
    HTTPStateService,
    // DashboardActions,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  entryComponents: [ChangePasswordModalComponent, ConfirmDialog,
    UserChangePasswordComponent, UpdatePlanComponent, DeleteExceptionDialog, SuccessDialog, ErrorGetDialog, ErrorPostDialog],
  bootstrap: [AppComponent]
})
export class AppModule {
}
export function httpFactory(backend: XHRBackend, options: RequestOptions,
  responseHandler: ResponseHandlerService,
  httpState: HTTPStateService) {
  return new HttpService(backend, options, responseHandler, httpState);
}

