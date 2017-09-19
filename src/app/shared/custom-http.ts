import { Injectable } from '@angular/core';
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ResponseHandlerService } from './response-handler.service';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';


@Injectable()
export class HTTPStateService {
  private getProtocolStateSource = new Subject<boolean>();
  private getErrorStateSource = new Subject<boolean>();
  private postProtocolStateSource = new Subject<boolean>();
  private postProtocolStartSource = new Subject<boolean>();
  private postErrorStateSource = new Subject<boolean>();
  private postOutcomeSource = new Subject<boolean>();
  getProtocolState$ = this.getProtocolStateSource.asObservable();
  getErrorState$ = this.getErrorStateSource.asObservable();
  postProtocolState$ = this.postProtocolStateSource.asObservable();
  postErrorState$ = this.postErrorStateSource.asObservable();
  postStartState$ = this.postProtocolStartSource.asObservable();
  postOutcomeState$ = this.postOutcomeSource.asObservable();
  setGetState(inProcess: boolean) {
    this.getProtocolStateSource.next(inProcess);
  }

  setGetError(error: boolean) {
    this.getErrorStateSource.next(error);
  }

  setPostState(inProcess: boolean) {
    this.postProtocolStateSource.next(inProcess);
  }

  setPostError(error: boolean) {
    this.postErrorStateSource.next(error);
  }

  setPostProtocolStart(started: boolean) {
    this.postProtocolStartSource.next(started);
  }
  setPostOutcome(success: boolean) {
    this.postOutcomeSource.next(success);
  }
};

@Injectable()
export class HttpService extends Http {
  token = localStorage.getItem('token');
  GetCallInProcess = false;
  subscription: Subscription;

  constructor(backend: XHRBackend, options: RequestOptions,
    private responseHandler: ResponseHandlerService,
    private httpState: HTTPStateService) {
    super(backend, options);
    const token = localStorage.getItem('token'); // your custom token getter function here
    // options.headers.set('Authorization', token);
    this.subscription = httpState.getProtocolState$.subscribe(
      state => {
        this.GetCallInProcess = state;
      }
    );
  }

  private showGetLoader(): void {
    this.httpState.setGetState(true);
  }

  // methods to intercept get calls
  private onGetCatch(error: any, caught: Observable<any>): Observable<any> {
    return Observable.throw(error);
  }

  private onPostCatch(error: any, caught: Observable<any>): Observable<any> {
    return Observable.throw(error);
  }

  private onPostSuccess(res: Response): Response {
    this.hidePostLoader();
    this.httpState.setPostOutcome(true);
    return res;
  }

  private onGetSuccess(res: Response): Response {
    this.hideGetLoader();
    return res;
  }

  private onGetError(error: any): void {
    console.log('server error on get ', error);
    this.httpState.setGetError(true);
    this.httpState.setGetState(false);
    // make something special on error
  }

  private onPostError(error: any): void {
    console.log('post service error ', error);
    this.httpState.setPostError(true);
    this.httpState.setPostState(false);
    // make something special on error
  }

  private hideGetLoader(): void {
    this.httpState.setGetState(false);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<any> {
    this.showGetLoader();
    return super.get(url, options)
      .catch(this.onGetCatch)
      .do((res: Response) => {
        this.onGetSuccess(res);
      }, (error: any) => {
        this.onGetError(error);
      })
      .finally(() => {
        //   this.hideGetLoader();
        console.log('finished get request');
      });
  }


  private hidePostLoader() {
    this.httpState.setPostState(false);
  }

  post(url: string, data: any, options?: RequestOptionsArgs): Observable<Response> {
    this.httpState.setPostProtocolStart(true);
    return super.post(url, data, options)
      .catch(this.onPostCatch)
      .do((res: Response) => {
        this.onPostSuccess(res);
      }, (error: any) => {
        this.onPostError(error);
      })
      .finally(() => {
        console.log('finished post request');
        this.httpState.setPostProtocolStart(false);
        // this.hidePostLoader();
      });
  }


  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    const token = localStorage.getItem('token');
    if (typeof url === 'string') { // meaning we have to add the token to the options, not in url
      if (!options) {
        // let's make option object
        options = { headers: new Headers() };
      }
      options.headers.set('Authorization', token);
    } else {
      // we have to add the token to the url object
      url.headers.set('Authorization', token);
    }
    return super.request(url, options).catch(this.catchAuthError(this));
  }

  private catchAuthError(self: HttpService) {
    // we have to pass HttpService's own instance here as `self`
    return (res: Response) => {
      if (res.status === 401 || res.status === 403) {
        // if not authenticated => token has gone;

        console.log(self);
        this.responseHandler.handle401Error();
        console.log(res);
      }
      return Observable.throw(res);
    };
  }
}



