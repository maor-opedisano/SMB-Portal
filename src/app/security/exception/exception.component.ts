import {Component} from '@angular/core';
import {
  ExceptionSettingsComponent,
  ExistingExceptionsComponent,
  NewExceptionComponent
} from './templates/templates.component';
import {SecurityService} from '../security.service';
import {Policy} from '../../model/company-policy';


@Component({
  selector: 'app-exception',
  templateUrl: './exception.component.html',
  styleUrls: ['./exception.component.css'],
  entryComponents: [ExceptionSettingsComponent, ExistingExceptionsComponent, NewExceptionComponent],
  providers: [SecurityService]
})

export class ExceptionComponent {
  newDepartment = false;
  dataIsLoading = true;
  settings: { [name: string]: Policy };
  allSettingsBackUp: { [name: string]: Policy };
  exceptionsList: any = {};
  noSettingsExist: boolean;

  constructor(private securityService: SecurityService) {
    this.loadSettings();
  };

  loadSettings = () => {
    this.securityService.getPolicyExceptionsSettings().subscribe(
      (result) => {
        if (Object.keys(result).length === 0 && result.constructor === Object) {
          this.noSettingsExist = true;
        } else {
          this.noSettingsExist = false;
          this.settings = result[Object.keys(result)[0]];
          this.allSettingsBackUp = this.settings;
          this.exceptionsList = result;
          console.log(this.exceptionsList);
        }
      }, (error) => {
        console.log('an error occurred');
      },
      () => {
        this.dataIsLoading = false;
      }
    );
  }
  selectDepartment = (departmentName: string) => {
    this.settings = this.exceptionsList[departmentName];
  }
  deletePolicy = (policy: Policy) => {
    this.securityService.deletePolicyExceptionSettings(policy).subscribe(
      result => {
        const policyName = policy.policyName;
        delete this.exceptionsList[policyName];
        if (Object.keys(this.exceptionsList).length === 0) {
          this.noSettingsExist = true;
        } else {
          this.settings = this.exceptionsList[Object.keys(this.exceptionsList)[0]];
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  cancelCreation = (cancel: boolean) => {
    this.newDepartment = cancel;
    this.settings = this.allSettingsBackUp;
    this.noSettingsExist = (Object.keys(this.settings).length === 0 && this.settings.constructor === Object) ? true : false;
  }


  newDptQuery = (newDpt: boolean) => {
    this.newDepartment = newDpt;
  }
  postNewSettings = (settings: Policy) => {
    this.securityService.savePolicyExceptionSettings(settings).subscribe(
      success => {
        const policyName = settings.policyName;
        this.exceptionsList[policyName] = success;
        this.newDepartment = false;
        this.allSettingsBackUp[policyName] = success;
        this.settings = this.allSettingsBackUp;
        this.noSettingsExist = false;
      },
      error => console.log(error)
    );
  }

}
