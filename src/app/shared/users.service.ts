/**
 * Created by if_found_call_0586288454 on 24/04/2017 ap. J.-C..
 */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Observer } from 'rxjs/Rx';
import { LoginAccessViewModel, AnonymousLoginModel } from '../model/login.model';
@Injectable()
export class UserService {

  private clientId: string;
  private clientSecret: string;
  constructor(private http: Http) {
    this.clientId = 'ResecApp';
    this.clientSecret = 'ResecSecret';
  }
  AnonoymousLogin(server): Observable<LoginAccessViewModel> {
    const LoginUrl = 'http://' + server + ':4580/sob/api/emails/loginAnonymously';
    const data = new AnonymousLoginModel(this.clientId, this.clientSecret);
    return Observable.create((observer: Observer<LoginAccessViewModel>) => {
      this.http.post(LoginUrl, data)
        .map((response: any) => response.json())
        .subscribe((tokenData: any) => {

          observer.next(tokenData);
        }, (error) => observer.error(error),
        () => observer.complete());
    });


  }
  login(server, username, password): Observable<any> {
    const LoginUrl = 'http://' + server + ':4580/api/users/login';
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }); // ... Set content type to JSON
    const options = new RequestOptions({ headers: headers }); // Create a request option
    let data = 'grant_type=password&username=' + username + '&password=' + password;
    data = data + '&client_id=' + this.clientId + '&client_secret=' + this.clientSecret;

    return Observable.create((observer: Observer<Response>) => {
      this.http.post(LoginUrl, data, options)
        .map((response: any) => response.json())
        .subscribe((tokenData: any) => {

          observer.next(tokenData);
        }, (error) => observer.error(error),
        () => observer.complete());
    });
  }
}


