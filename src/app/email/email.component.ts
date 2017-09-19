import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  };

  convertToDate = (rawDate: string) => {
    const date = new Date(rawDate);
    return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
  }

}
