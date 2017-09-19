import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/users.service';
import { Router } from '@angular/router';
import { MdIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { AccountService } from '../account/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService, AccountService]
})
export class LoginComponent implements OnInit {

  user: any = {};
  public wrongId = false;
  public submitted = false;
  public checkingUser = false;
  private currentAccount: any;
  public urlHasServer: boolean;

  constructor(private userService: UserService, private accountService: AccountService, private router: Router, sanitizer: DomSanitizer, iconReg: MdIconRegistry) {
    iconReg.addSvgIcon('resecLoginLogo', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/resecLogoLogin.svg'));
  }

  checkServerInUrl() {
    const serverInUrl = window.location.href.split('?s=')[1];
    this.urlHasServer = (serverInUrl) ? true : false;
    localStorage.setItem('urlHasServer', this.urlHasServer.toString());
    this.user.server = (this.urlHasServer) ? serverInUrl : '';
  }

  ngOnInit() {
    localStorage.clear();
    // this.detectBrowser();
    // console.log(window.location.href);
    this.checkServerInUrl();
  }
  onSubmit() {
    this.submitted = true;
    this.checkLogin();
  }
  checkState() {
    const servername = localStorage.getItem('serverName');
    const token = localStorage.getItem('token');
    console.log('here it is ', servername);
    console.log('token', token);
    if (servername && token.length > 14) {
      return true;
    }
    return false;
  }
  checkLogin() {
    this.checkingUser = true;
    this.wrongId = false;
    this.userService.login(this.user.server, this.user.username, this.user.password)
      .subscribe(
      success => {
        if (success.UserRole !== 'SelfOnBoard') {
          this.wrongId = true;
          this.submitted = false;
          this.checkingUser = false;
        } else {
          localStorage.setItem('serverName', this.user.server);
          localStorage.setItem('userRole', success.UserRole);
          localStorage.setItem('currentPassword', this.user.password);
          const token = 'Bearer ' + success['access_token'];
          const isFirstTime = success.IsFirstTime;
          localStorage.setItem('token', token);
          localStorage.setItem('username', this.user.username);
          this.checkingUser = false;
          this.accountService.getAccountGeneralSettingsWithServerAddress(this.user.server).subscribe(
            result => {
              if (result == null) {
                return;
              }
              this.currentAccount = result;
              const isFistLogin = result.IsFirstTime;
              localStorage.setItem('isFirstTime', isFirstTime);
              if (this.checkState()) {
                if (isFistLogin) {
                  this.router.navigate(['user/firstTimeChangePassword']);
                } else {
                  this.router.navigate(['/user/dashboard']);
                }
              }
            }, error => {
              console.log(error);
            });
        }
      },
      error => {
        console.log(error);
        this.wrongId = true;
        this.submitted = false;
        this.checkingUser = false;
      }
      )
      ;
  }

  /* detectBrowser(){
     const isChrome = (navigator.userAgent.toLowerCase().includes('chrome')) ? true : false;
     if (!isChrome){
       this.router.navigate(['wrong-browser']);
     }
   }*/
}
