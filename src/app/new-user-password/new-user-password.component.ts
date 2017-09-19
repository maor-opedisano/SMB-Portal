import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../account/account.service';
import { PasswordMethods, PasswordModel } from '../model/passwords.model';


@Component({
  selector: 'app-new-user-password',
  templateUrl: './new-user-password.component.html',
  styleUrls: ['./new-user-password.component.css'],
  providers: [AccountService]
})
export class NewUserPasswordComponent extends PasswordMethods {
  passwordsToSend: PasswordModel = new PasswordModel();
  private currentAccount: any;
  constructor(private accountService: AccountService, private router: Router) {
    super();
    this.accountService.getAccountGeneralSettings().subscribe(
      result => {
        if (result == null) {
          return;
        }
        this.currentAccount = result;
      });
  }

  applyChangePassword = () => {
    const thisObject = this;
    this.accountService.ChangePassword(this.passwordsToSend).subscribe(
      result => {
        const updatedBlob = thisObject.currentAccount;
        updatedBlob.IsFirstLogin = false;
        thisObject.accountService.postAccountGeneralSettings(updatedBlob).subscribe(() => {
          this.router.navigate(['user/dashboard']);
        },
          (error) => console.log(error));
      }
      ,
      (error) => console.log(error));
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

}
