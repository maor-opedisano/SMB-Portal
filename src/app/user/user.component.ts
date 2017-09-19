import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';
import { MdDialog, MdDialogRef } from '@angular/material';
import { AccountService } from '../account/account.service';
import { HTTPStateService } from '../shared/custom-http';
import { Subscription } from 'rxjs/Subscription';
import { TdLoadingService } from '@covalent/core';
import { PasswordMethods, PasswordModel } from '../model/passwords.model';
import { SuccessDialog, ErrorGetDialog, ErrorPostDialog } from '../shared/system.dialogs';

@Component({
  selector: 'app-user-change-password',
  templateUrl: './changePassword.html',
  providers: [AccountService],
  styleUrls: ['./user.component.css']
})

export class UserChangePasswordComponent extends PasswordMethods {

  changePassword = true;
  forgotPassword = false;
  passwordsToSend: PasswordModel = new PasswordModel();
  constructor(public dialogRef: MdDialogRef<UserChangePasswordComponent>,
    private accountService: AccountService, private router: Router) {
    super();
  }

  switchToForgotPassword = () => {
    this.changePassword = false;
    this.forgotPassword = true;
  }

  fieldIsValid(password: string) {
    return this.passwordIsValid(password);
  }

  oldPasswordIsValid(currentPassword: string) {
    return this.currentPasswordIsValid(currentPassword);
  }

  passwordsAreValid(newPassword: string, confirmNewPassword: string) {
    return this.bothPasswordsAreValidAndMatch(newPassword, confirmNewPassword);
  }

  applyChangePassword() {
    this.accountService.ChangePassword(this.passwordsToSend).subscribe(
      result => {
        localStorage.clear();
        this.dialogRef.close();
        this.router.navigate(['login']);
      }, error => {
        console.log(error);
      }
    );
  }


}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  entryComponents: [UserChangePasswordComponent, SuccessDialog],
  providers: [AccountService]
})

export class UserComponent implements OnDestroy {
  private currentUrl: string;
  username: string;
  private servername: string;
  showLoader = false;
  showPostLoader = false;
  conditionalId: string;
  isFirstTimeUser: boolean;
  overlayStarSyntax = false;
  getStateSubscription: Subscription;
  postStateSubscription: Subscription;
  getErrorStateSubscription: Subscription;
  postErrorStateSubscription: Subscription;
  postRequestHasStarted: Subscription;
  postRequestOutcome: Subscription;

  // TODO:: change the value from the service
  isStripeUser = false;
  private dialogRef: MdDialogRef<any>;

  showSuccessDialog() {
    const dialogRef = this.dialog.open(SuccessDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }
  showGetErrorDialog() {
    const dialogRef = this.dialog.open(ErrorGetDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }
  showPostErrorDialog() {
    const dialogRef = this.dialog.open(ErrorPostDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
      }
    });
  }
  togglePostSpinner(): void {
    if (!this.showPostLoader) {
      this._loadingService.resolve('overlayStarSyntax');
    } else {
      this._loadingService.register('overlayStarSyntax');
    }
    this.overlayStarSyntax = !this.overlayStarSyntax;
  }

  constructor(private router: Router,
    iconReg: MdIconRegistry,
    sanitizer: DomSanitizer,
    public dialog: MdDialog,
    public accountService: AccountService,
    private httpState: HTTPStateService,
    private _loadingService: TdLoadingService) {

    this.isFirstTimeUser = (localStorage.getItem('isFirstTime') === 'true');
    this.getStateSubscription = this.httpState.getProtocolState$.subscribe(
      state => {
        this.showLoader = state;
      });
    this.getErrorStateSubscription = this.httpState.getErrorState$.subscribe(
      error => {
        this.showLoader = !this.showLoader;
        this.showGetErrorDialog();
      });
    this.postErrorStateSubscription = this.httpState.postErrorState$.subscribe(
      state => {
        this.showPostErrorDialog();
      });
    this.postRequestHasStarted = this.httpState.postStartState$.subscribe(
      state => {
        this.showPostLoader = state;
        this.togglePostSpinner();
      });

    this.postStateSubscription = this.httpState.postProtocolState$.subscribe(
      state => {
        if (state) {
          this.showSuccessDialog();
        };
        // this.togglePostSpinner();
      });

    this.postRequestOutcome = this.httpState.postOutcomeState$.subscribe(
      success => {
        if (success) {
          this.showSuccessDialog();
        }
      });

    this.servername = localStorage.getItem('serverName');
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
        this.setConditionalIdForAppContainer(event.url);
      }
      const user = localStorage.getItem('username');
      if (user) {
        this.username = user.charAt(0).toUpperCase() + user.slice(1);
      }
    });

    this.accountService.getAccountGeneralSettings().subscribe(
      result => {
        if (result == null) {
          return;
        }

        this.isStripeUser = result.StripeSubscriptionToken ? true : false;
      }, error => {
        console.log(error);
      });

    iconReg.addSvgIcon('dashboard', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/dashboard.svg'))
      .addSvgIcon('security', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/security_settings.svg'))
      .addSvgIcon('mails', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/mails.svg'))
      .addSvgIcon('settings', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/settings.svg'))
      .addSvgIcon('loginLogo', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/loginLogo'))
      .addSvgIcon('resecLogo', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/resecLogo.svg'))
      .addSvgIcon('help', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/info.svg'))
      .addSvgIcon('releaseMail', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/releaseMail.svg'))
      .addSvgIcon('forwardMail', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/forwardMail.svg'))
      .addSvgIcon('successIcon', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/success.svg'))
      .addSvgIcon('serverError', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/serverError.svg'));
  }

  setConditionalIdForAppContainer(currentRoute: string) {
    this.conditionalId = (currentRoute === '/user/security/exceptions') ? 'securityId' : 'userAppContainer';
  }


  defineUserOrigin() {
    let hasLoggedWithParamInUrl: boolean;
    const lsValue = localStorage.getItem('urlHasServer');
    hasLoggedWithParamInUrl = (lsValue === 'true') ? true : false;
    return hasLoggedWithParamInUrl;
  }

  logout = () => {
    if (this.defineUserOrigin()) {
      this.router.navigate(['login'], { queryParams: { s: this.servername } });
    } else {
      this.router.navigate(['login']);
    }
    ;
    localStorage.clear();
  }

  testRoute = (parent: string) => {
    if (this.currentUrl) {
      return this.currentUrl.indexOf(parent) >= 0;
    }
  }
  openChangePassword() {
    this.dialogRef = this.dialog.open(UserChangePasswordComponent, { width: '40%' });
  };
  ngOnDestroy() {
    this.getStateSubscription.unsubscribe();
    this.postStateSubscription.unsubscribe();
    this.getErrorStateSubscription.unsubscribe();
    this.postErrorStateSubscription.unsubscribe();
    this.postRequestHasStarted.unsubscribe();
    this.postRequestOutcome.unsubscribe();
  }
}
