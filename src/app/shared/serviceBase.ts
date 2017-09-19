
import { HttpService } from '../shared/custom-http';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';
@Injectable()
export class ServiceBase {
  // protected regularHttp: Http;
  // protected http: HttpService;
  protected constructor(protected http: HttpService, protected regularHttp: Http) {
    // this.http = http;
    // this.regularHttp = regularHttp;
  }
  public handleError(error: Response): Observable<any> {
    console.error(error);
    return Observable.throw(error.json().error || 'Sorry we could not fetch the data');
  }
  public extractData(res: Response) {
    return res.json();
  }
}


