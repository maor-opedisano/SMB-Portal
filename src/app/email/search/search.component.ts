import { Component, OnInit } from '@angular/core';
import { MailService } from '../email.service';
import { EmailComponent } from '../email.component';

class Query {
  ticketId: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['../email.component.css'],
  providers: [MailService]
})
export class SearchComponent extends EmailComponent implements OnInit {

  emails: any = {};
  query: Query = new Query();
  isFirstTime;
  noSearchInitiated = true;
  totalNumberOfMails: number;
  pullingData = false;
  noResultFound = false;
  mailHasNoAttachments: boolean;
  mycolor: string;
  fs: number;

  constructor(private mailService: MailService) {
    super();
  };

  ngOnInit() {
    this.mycolor = 'red';
    this.fs = 60;
    this.isFirstTime = false;
    console.log(this.isFirstTime);
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
