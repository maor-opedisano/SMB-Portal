import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
@Component({
  selector: 'change-password-modal-component',
  templateUrl: './changePassword.html',
  styleUrls: ['./account-general.component.css'],
  providers: [AccountService]
})

export class ChangePasswordModalComponent {
  resetPassword = false;
  forgotPassword = true;

  passwordsToSend: any = {};

  constructor(public dialogRef: MatDialogRef<ChangePasswordModalComponent>, private accountService: AccountService) {
  }

  switchToForgotPassword = () => {
    this.resetPassword = true;
    this.forgotPassword = false;
  }

  changePassword = () => {
    this.accountService.ChangePassword(this.passwordsToSend).subscribe(
      result => {
        console.log(result);
        const newToken = 'Bearer ' + result.AccessToken;
        localStorage.setItem('token', newToken);
      }, error => {
        console.log(error);
      }
    );
  }
}

class AccountOwnerData {
  name: string;
  phone: number;
  email: string;
  password?: string;
};

class CompanyData {
  name: string;
  domain: string;
  mxRecord: string;
}

@Component({
  selector: 'app-account-general',
  templateUrl: './account-general.component.html',
  styleUrls: ['./account-general.component.css'],
  providers: [AccountService],
  entryComponents: [ChangePasswordModalComponent]
})

export class AccountGeneralComponent implements OnInit {

  private dialogRef: MatDialogRef<any>;
  testEmailSent = false;
  isAdmin = false;
  // scroll down to see class SettingsForm
  accountOwnerData: AccountOwnerData = new AccountOwnerData;
  adminData: AccountOwnerData = new AccountOwnerData;
  companyData: CompanyData = new CompanyData;
  currentAccount: any;

  constructor(private accountService: AccountService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.accountService.getAccountGeneralSettings().subscribe(
      result => {
        if (result == null) {
          return;
        }

        this.currentAccount = result;

        // account data
        this.accountOwnerData.phone = result.AccountOwnerPhone;
        this.accountOwnerData.email = result.AccountOwnerEmail;
        this.accountOwnerData.name = result.AccountOwnerName;

        // admin data
        this.adminData.phone = result.AccountAdminPhone;
        this.adminData.email = result.AccountAdminEmail;
        this.adminData.name = result.AccountAdminName;

        // company data
        this.companyData.name = result.CompanyName;
        this.companyData.domain = result.CompanyDomain;
        this.companyData.mxRecord = result.MxRecord;

        this.isAdmin = result.AccountOwnerIsAdmin;
      }, error => {
        console.log(error);
      }
    );
  }

  sendTestEmail = () => {
    this.testEmailSent = true;
    setTimeout(() => {
      this.testEmailSent = !this.testEmailSent;
    }, 2500);
  }

  openChangePassword() {
    this.dialogRef = this.dialog.open(ChangePasswordModalComponent, { width: '40%' });
    this.dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  saveAccountData() {
    // add validation on data if needed

    const blobDataToSend = this.currentAccount;

    // update the form data
    blobDataToSend.AccountOwnerPhone = this.accountOwnerData.phone;
    blobDataToSend.AccountOwnerEmail = this.accountOwnerData.email;
    blobDataToSend.AccountOwnerName = this.accountOwnerData.name;
    blobDataToSend.AccountOwnerIsAdmin = this.isAdmin;

    blobDataToSend.AccountAdminPhone = this.adminData.phone;
    blobDataToSend.AccountAdminEmail = this.adminData.email;
    blobDataToSend.AccountAdminName = this.adminData.name;

    this.accountService.postAccountGeneralSettings(blobDataToSend).subscribe(() => {
      // TODO:: show success dialog
    }
      ,
      error => console.log(error)
    );
  }
}

