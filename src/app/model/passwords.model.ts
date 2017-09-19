/**
 * Created by if_found_call_0586288454 on 11/06/2017 ap. J.-C..
 */

export class PasswordMethods {


  passwordsMatch = (password1: string, password2: string) => {
    return (password1 === password2 && password2 !== undefined);
  }
  hasUpperCase = (password: string) => {
    return (/[A-Z]/.test(password));
  }
  hasLowerCase = (password: string) => {
    return (/[a-z]/.test(password));
  }
  hasNumber = (password: string) => {
    return (/[0-9]/.test(password));
  }
  hasSpecialChars = (password: string) => {
    return (/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(password));
  }

  currentPasswordIsValid(currentPassword: string) {
    const currentPasswordFromLocalStorage = localStorage.getItem('currentPassword');
    console.log(currentPasswordFromLocalStorage);
    console.log(currentPassword);
    return currentPasswordFromLocalStorage === currentPassword;
  }

  passwordIsValid(password: string) {
    return (this.hasUpperCase(password) && this.hasLowerCase(password) && this.hasNumber(password) && this.hasSpecialChars(password));
  }

  bothPasswordsAreValidAndMatch(newPassword: string, newPasswordConfirm: string) {
    return (this.passwordsMatch(newPassword, newPasswordConfirm) && this.passwordIsValid(newPassword));
  }


}

export class PasswordModel {
  CurrentPassword: string;
  NewPassword: string;
  ConfirmNewPassword: string;
}
