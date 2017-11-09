import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MailService } from '../email.service';
import { UserService } from '../../shared/users.service';
import { EmailComponent } from '../email.component';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

class Query {
  ticketId: string;
  Recipient: string;
}

@Component({
  selector: 'app-release',
  templateUrl: './release.component.html',
  styleUrls: ['../email.component.css'],
  providers: [MailService, UserService]
})
export class ReleaseComponent extends EmailComponent implements OnInit, OnDestroy {

  emails: any = {};
  query: Query = new Query();

  noSearchInitiated = true;
  totalNumberOfMails: number;
  pullingData = false;
  noResultFound = false;
  mailHasNoAttachments: boolean;
  fs: number;
  showLoader = false;
  private serverAddress: string;
  private ticketId: string;
  private recipientAddress: string;
  constructor(private mailService: MailService, private userService: UserService, private activatedRoute: ActivatedRoute, sanitizer: DomSanitizer, iconReg: MatIconRegistry) {
    super();

    this.readQueryParams();

    iconReg.addSvgIcon('resecLoginLogo', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/resecLogoLogin.svg'))
      .addSvgIcon('mails', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/mails.svg'))
      .addSvgIcon('help', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/info.svg'))
      .addSvgIcon('releaseMail', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/releaseMail.svg'))
      .addSvgIcon('forwardMail', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/forwardMail.svg'))
      .addSvgIcon('successIcon', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/success.svg'))
      .addSvgIcon('serverError', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/serverError.svg'));
    if (this.serverAddress) {
      this.showLoader = true;

      // perform login with temp user
      this.loginAsGuest().then(res => {
        // get email by ticket id
        this.searchMails();
        this.showLoader = false;
      }, err => { this.showLoader = false; });
    } else {
      console.log('server address is empty!!!');
    }
  };

  ngOnInit() {



  }
  ngOnDestroy() {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    localStorage.clear();
  }
  private readQueryParams() {
    // parse ticketId and server address from wuery string
    const queryParams = this.activatedRoute.snapshot.queryParams;
    this.query.ticketId = queryParams['t'];
    console.log(this.query.ticketId);
    this.query.Recipient = queryParams['r'];
    console.log(this.query.Recipient);
    this.serverAddress = queryParams['s'];
    console.log(this.serverAddress);
    localStorage.setItem('serverName', this.serverAddress);
  }
  loginAsGuest(): Promise<{}> {
    const promise = new Promise((resolve, reject) => {
      this.userService.AnonoymousLogin(this.serverAddress)
        .subscribe(
        success => {

          localStorage.setItem('userRole', success.UserRole);
          localStorage.setItem('currentPassword', '');
          const token = 'Bearer ' + success.AccessToken;
          localStorage.setItem('token', token);
          localStorage.setItem('username', success.UserName);
          resolve();
        }, error => {
          console.log(error);
          reject(error);
        });
    });
    return promise;
  }
  emptyQuery() {
    this.noSearchInitiated = true;
    this.query = new Query();
  }

  searchMails() {
    this.pullingData = true;
    const noWhiteSpaceTicketId = this.query.ticketId.replace(/ /g, '');
    this.query.ticketId = noWhiteSpaceTicketId;
    this.mailService.searchMails(this.query).subscribe(
      success => {
        console.log(success);
        this.emails = success.List.pop();
        this.mailHasNoAttachments = (Object.keys(this.emails['Attached Files Outcomes']).length === 0) ? true : false;
        this.totalNumberOfMails = success.Total;
        this.noResultFound = (this.totalNumberOfMails > 0) ? false : true;
        this.pullingData = false;
        this.noSearchInitiated = false;
      },
      error => {
        console.log(error);
        this.showLoader = false;
      }
    );
  }

  performAction = (sanitizationId: number, action: string) => {
    const id = [sanitizationId];
    this.mailService.performAction(id, action).subscribe(
      success => {
        console.log(success);
      }, error => {
        console.log(error);
      }
    );
  }

}
