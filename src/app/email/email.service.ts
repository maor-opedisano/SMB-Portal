import { ResultsModel, EmailModel } from '../model/email.model';
import { Injectable } from '@angular/core';
import { HttpService } from '../shared/custom-http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class MailService {

  get token(): string {
    return localStorage.getItem('token');
  }
  get server(): string {
    return localStorage.getItem('serverName');
  }
  constructor(private http: HttpService) {
  }

  searchMails(query): Observable<ResultsModel<EmailModel>> {
    const searchUrl = 'http://' + this.server + ':4580/sob/api/emails/search?q=1';
    return this.http.get(searchUrl, { search: query })
      .map((res) => {
        console.log(res);
        return (res.json() as ResultsModel<EmailModel>);
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error, could not retrieve mails'));
  }

  performAction(selection, action): Observable<string> {
    const actionUrl = 'http://' + this.server + ':4580/sob/api/emails/performAction/?actionName=' + action;
    return this.http.post(actionUrl, selection)
      .map((res) => res.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error, could not perform the action'));
  }

}
