import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  providers: [AccountService]
})
export class NotificationsComponent implements OnInit {

  adminSettings: any = {};

  constructor(private accountService: AccountService) {
  }

  ngOnInit() {
    this.loadSettings();
  }

  loadSettings = () => {
    this.accountService.GetAccountNotificationsSettings().subscribe(
      result => {
        this.adminSettings = result;
      },
      error => {
        console.log(error);
      }
    );
  }

  postSettings = () => {
    this.accountService.PostAccountNotificationsSettings(this.adminSettings).subscribe(
      result => { console.log(result); },
      error => { console.log(error); }
    );
  }
}
