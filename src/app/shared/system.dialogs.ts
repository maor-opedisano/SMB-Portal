/**
 * Created by if_found_call_0586288454 on 13/06/2017 ap. J.-C..
 */
import {Component} from '@angular/core';
import {MdDialogRef} from '@angular/material';


@Component({
  selector: 'app-system-dialog',
  template: ` 
    <h3 md-dialog-title class="text-center"> 
    <md-icon id="success-icon-modal" svgIcon="successIcon"></md-icon>
  </h3>
  <md-dialog-content>Your changes were successfully saved</md-dialog-content>
  <md-dialog-actions layout="row" layout-align="center center">
    <button md-button md-dialog-close (click)="dialogRef.close(false)">OK</button>
  </md-dialog-actions>
  `,
})

export class SuccessDialog {
  constructor(public dialogRef: MdDialogRef<SuccessDialog>) {
  }
}
@Component({
  selector: 'app-error-get-dialog',
  template: `
    <h3 md-dialog-title class="text-center">
      <md-icon id="success-icon-modal" svgIcon="serverError"></md-icon>
    </h3>
    <md-dialog-content>We could not reach our servers</md-dialog-content>
    <md-dialog-actions layout="row" layout-align="space-between center">
      <button md-button md-dialog-close>OK</button>
      <button md-button md-dialog-close (click)="dialogRef.close(true)">Try Again</button>
    </md-dialog-actions>
  `,
})

export class ErrorGetDialog {
  constructor(public dialogRef: MdDialogRef<ErrorGetDialog>) {
  }
}
@Component({
  selector: 'app-error-post-dialog',
  template: `
    <h3 md-dialog-title class="text-center">
      <md-icon id="success-icon-modal" svgIcon="serverError"></md-icon>
    </h3>
    <md-dialog-content>We could not save your settings</md-dialog-content>
    <md-dialog-actions layout="row" layout-align="center center">
      <button md-button md-dialog-close>OK</button>
    </md-dialog-actions>
  `,
})

export class ErrorPostDialog {
  constructor(public dialogRef: MdDialogRef<ErrorPostDialog>) {
  }
}

