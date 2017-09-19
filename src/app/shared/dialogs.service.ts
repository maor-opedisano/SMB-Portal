import {Observable} from 'rxjs/Rx';
import {MdDialogRef, MdDialog} from '@angular/material';
import {Injectable, Component} from '@angular/core';

@Component({
  selector: 'confirm-dialog',
  template: `
    <p class="text-center bold-dark-gray">{{ title }}</p>
    <p class="text-center">{{ message }}</p>
    <div class="text-center mt-4 mb-4">
      <button type="button" class=" btn btn-action"
              (click)="dialogRef.close(true)">Logout
      </button>
    </div>
  `,
})
export class ConfirmDialog {

  public title: string;
  public message: string;

  constructor(public dialogRef: MdDialogRef<ConfirmDialog>) {
  }


}
@Injectable()
export class DialogsService {

  constructor(private dialog: MdDialog) {
  }

  public Logout(title: string, message: string): Observable<boolean> {

    let dialogRef: MdDialogRef<ConfirmDialog>;
    dialogRef = this.dialog.open(ConfirmDialog, {disableClose: true});
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;
    return dialogRef.afterClosed();
  }
}
