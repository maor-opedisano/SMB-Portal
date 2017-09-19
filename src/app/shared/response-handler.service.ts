import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {DialogsService} from './dialogs.service';

@Injectable()
export class ResponseHandlerService {

  private server: string;

  constructor(private router: Router, private dialogs: DialogsService) {
    this.server = localStorage.getItem('serverName');
  }

  defineUserOrigin() {
    let hasLoggedWithParamInUrl: boolean;
    const lsValue = localStorage.getItem('urlHasServer');
    hasLoggedWithParamInUrl = (lsValue === 'true') ? true : false;
    return hasLoggedWithParamInUrl;
  }

  handle401Error = () => {
    console.log('navigating back to login');
    this.dialogs.Logout('Session Expired', 'Your session has expired, you will be logged out in ').subscribe(
      res => {
        if (this.defineUserOrigin()) {
          this.router.navigate(['login'], {queryParams: {s: this.server}});
        } else {
          this.router.navigate(['login']);
        }
        ;
        localStorage.clear();
      }
    );
  }
}

