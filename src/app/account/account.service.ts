import { Injectable } from '@angular/core';
import { HttpService } from '../shared/custom-http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AccountService {

  public server = localStorage.getItem('serverName');

  constructor(private http: HttpService) {
  }

  GetAccountBillingSettings(): Observable<any> {
    const urlGetAccountBillingSettings = 'http://' + this.server + ':4580/sob/api/GetAccountBillingSettings';
    return this.http.get(urlGetAccountBillingSettings)
      .map((res) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error, could not verify login'));
  }

  PostAccountBillingSettings(): Observable<any> {
    const urlPostAccountBillingSettings = 'http://' + this.server + ':4580/sob/api/PostAccountBillingSettings';
    return this.http.post(urlPostAccountBillingSettings, {})
      .map((res) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error, could not post billing settings'));
  }

  GetAccountNotificationsSettings(): Observable<any> {
    const urlGetAccountNotificationsSettings = 'http://' + this.server + ':4580/sob/api/GetAccountNotificationsSettings';
    return this.http.get(urlGetAccountNotificationsSettings)
      .map((res) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error, could not get notification settings'));
  }

  PostAccountNotificationsSettings(newSettings): Observable<any> {
    const urlPostAccountNotificationsSettings = 'http://' + this.server + ':4580/sob/api/PostAccountNotificationsSettings';
    return this.http.post(urlPostAccountNotificationsSettings, newSettings)
      .map((res) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error, could not get notification settings'));
  }

  getAccountGeneralSettings(): Observable<any> {
    const urlGetAccountGeneralSettings = 'http://' + this.server + ':4580/sob/api/GetAccountGeneralSettings';
    return this.http.get(urlGetAccountGeneralSettings)
      .map((res) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error, could not get account general settings'));
  }

  getAccountGeneralSettingsWithServerAddress(serverAddress: string): Observable<any> {
    const urlGetAccountGeneralSettings = 'http://' + serverAddress + ':4580/sob/api/GetAccountGeneralSettings';
    return this.http.get(urlGetAccountGeneralSettings)
      .map((res) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error, could not get account general settings'));
  }

  postAccountGeneralSettings(settings): Observable<any> {
    const urlPostAccountGeneralSettings = 'http://' + this.server + ':4580/sob/api/PostAccountGeneralSettings';
    return this.http.post(urlPostAccountGeneralSettings, settings)
      .map((res) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error, could not post account general settings'));
  }

  postAccountGeneralSettingsWithServerAddress(serverAddress, settings): Observable<any> {
    const urlPostAccountGeneralSettings = 'http://' + serverAddress + ':4580/sob/api/PostAccountGeneralSettings';
    return this.http.post(urlPostAccountGeneralSettings, settings)
      .map((res) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error, could not post account general settings'));
  }

  getBillingData(subscriptionId: string): Observable<any> {
    const urlGetSubscriptionInfo = 'http://' + this.server + ':4580/sob/api/stripe/subscriptionInfo';
    return this.http.get(urlGetSubscriptionInfo, { search: { subscriptionId: subscriptionId } })
      .map((res) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error, could not get account billing settings'));
  }

  updateBillingData(subscriptionId, updatedPlan: string): Observable<any> {
    const urlGetSubscriptionInfo = 'http://' + this.server + ':4580/sob/api/stripe/updatePlan?subscriptionId=' + subscriptionId + '&planId=' + updatedPlan;
    return this.http.post(urlGetSubscriptionInfo, { subscriptionId })
      .map((res) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error, could not update account billing settings'));
  }

  updateUsersNumber(subscriptionId, usersNumbers: string): Observable<any> {
    const urlGetSubscriptionInfo = 'http://' + this.server + ':4580/sob/api/stripe/updateUsersNo?subscriptionId=' + subscriptionId + '&usersNo=' + usersNumbers;
    return this.http.post(urlGetSubscriptionInfo, { subscriptionId })
      .map((res) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error, could not update account billing settings'));
  }



  ChangePassword(passwords): Observable<any> {
    const changePasswordUrl = 'http://' + this.server + ':4580/sob/api/users/changepassword';
    return this.http.post(changePasswordUrl, passwords)
      .map((res) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error, could not post account general settings'));
  }

}
