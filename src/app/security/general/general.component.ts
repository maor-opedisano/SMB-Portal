import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SecurityService } from '../security.service';
import {
  GeneralSettingsComponent,
  GeneralSettingsWithCDRComponent,
  GeneralSettingsWithoutCDRComponent,
  SpecialAttachmentsComponent
} from './templates/templates.components';
import { Policy } from '../../model/company-policy';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css'],
  providers: [SecurityService],
  entryComponents: [GeneralSettingsComponent, GeneralSettingsWithCDRComponent, GeneralSettingsWithoutCDRComponent, SpecialAttachmentsComponent]
})

export class GeneralComponent implements OnInit {
  mainPolicySettings: Policy = new Policy();

  ngOnInit() {
    this.securityService.getSettings().subscribe(
      result => {
        this.mainPolicySettings = result;
      }, error => {
        console.log('an error occurred');
      }
    );
  }
  constructor(private securityService: SecurityService, private changeDetection: ChangeDetectorRef) {

  }
  resetToDefaultValues(model: Policy) {
    const tmpPolicy = new Policy();
    tmpPolicy.exceptions = model.exceptions;
    tmpPolicy.policyId = model.policyId;
    tmpPolicy.policyName = model.policyName;
    this.mainPolicySettings = tmpPolicy;
  }
  saveSettings = () => {
    this.securityService.saveSettings(this.mainPolicySettings).subscribe(
      success => {
        console.log(success);
      }, error => {
        console.log(error);
      }
    );
  }


}
