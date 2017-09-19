/**
 * Created by if_found_call_0586288454 on 11/05/2017 ap. J.-C..
 */

import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';

@Injectable()
export class UserIsSobAndHasToken implements CanActivate {
  answer: boolean;

  constructor() {
  }

  canActivate() {
    const userRole = localStorage.getItem('userRole');
    const token = localStorage.getItem('token') || ' ';
    console.log(userRole);
    console.log(token.length);
    this.answer = (userRole === 'SelfOnBoard' && token.length > 16) ? true : false;
    console.log('service says :' + this.answer);
    return this.answer;
  }
}
