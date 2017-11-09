/**
 * Created by if_found_call_0586288454 on 13/06/2017 ap. J.-C..
 */
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-system-dialog',
  template: `
    <h3 mat-dialog-title class="text-center">
    <mat-icon id="success-icon-modal" svgIcon="successIcon"></mat-icon>
  </h3>
  <mat-dialog-content>Your changes were successfully saved</mat-dialog-content>
  <mat-dialog-actions layout="row" layout-align="center center">
    <button mat-button mat-dialog-close (click)="dialogRef.close(false)">OK</button>
  </mat-dialog-actions>
  `,
})

export class SuccessDialog {
  constructor(public dialogRef: MatDialogRef<SuccessDialog>) {
  }
}
@Component({
  selector: 'app-error-get-dialog',
  template: `
    <h3 mat-dialog-title class="text-center">
      <mat-icon id="success-icon-modal" svgIcon="serverError"></mat-icon>
    </h3>
    <mat-dialog-content>We could not reach our servers</mat-dialog-content>
    <mat-dialog-actions layout="row" layout-align="space-between center">
      <button mat-button mat-dialog-close>OK</button>
      <button mat-button mat-dialog-close (click)="dialogRef.close(true)">Try Again</button>
    </mat-dialog-actions>
  `,
})

export class ErrorGetDialog {
  constructor(public dialogRef: MatDialogRef<ErrorGetDialog>) {
  }
}
@Component({
  selector: 'app-error-post-dialog',
  template: `
    <h3 mat-dialog-title class="text-center">
      <mat-icon id="success-icon-modal" svgIcon="serverError"></mat-icon>
    </h3>
    <mat-dialog-content>We could not save your settings</mat-dialog-content>
    <mat-dialog-actions layout="row" layout-align="center center">
      <button mat-button mat-dialog-close>OK</button>
    </mat-dialog-actions>
  `,
})

export class ErrorPostDialog {
  constructor(public dialogRef: MatDialogRef<ErrorPostDialog>) {
  }
}

