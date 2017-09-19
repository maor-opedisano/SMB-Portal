import { Component, Input, ChangeDetectorRef, ViewChild, OnInit } from '@angular/core';
import { Policy } from '../../../model/company-policy';
export class GeneralSettingsBase {
  @Input() vertical = false;
}
@Component({
  selector: 'general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['../general.component.css']
})

export class GeneralSettingsComponent extends GeneralSettingsBase implements OnInit {
  _generalSettings: Policy;

  @ViewChild('hyperlink') hyperlinkSlider;

  @Input()
  set generalSettings(policy: Policy) {
    this._generalSettings = policy;
    this.hyperlinkSlider.writeValue(policy.handleLinks);
  }

  get generalSettings(): Policy {
    return this._generalSettings;
  }

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.hyperlinkSlider.registerOnChange((value) => {
      this._generalSettings.handleLinks = value;
    })
  }
}
@Component({
  selector: 'general-with-cdr',
  templateUrl: './with-cdr.component.html',
  styleUrls: ['../general.component.css']

})
export class GeneralSettingsWithCDRComponent extends GeneralSettingsBase implements OnInit {

  _generalSettings: Policy;
  @ViewChild('CDRSliderComponent') cdrSlider;

  @Input()
  set generalSettings(policy: Policy) {
    this._generalSettings = policy;
    this.cdrSlider.writeValue(policy.AttachmentsProcessedLevels.images);
  }
  get generalSettings(): Policy {
    return this._generalSettings;
  }

  ngOnInit(): void {
    this.cdrSlider.registerOnChange((value) => {
      this._generalSettings.AttachmentsProcessedLevels.images = value;
      this._generalSettings.AttachmentsProcessedLevels.presentations = value;
      this._generalSettings.AttachmentsProcessedLevels.spreadsheets = value;
      this._generalSettings.AttachmentsProcessedLevels.documents = value;
    });
  }
}

@Component({
  selector: 'general-without-cdr',
  templateUrl: './without-cdr.component.html',
  styleUrls: ['../general.component.css']
})

export class GeneralSettingsWithoutCDRComponent extends GeneralSettingsBase implements OnInit {
  constructor(private changeDetection: ChangeDetectorRef) {
    super();
  }

  _generalSettings: Policy;

  @ViewChild('videoSound') videoSoundSlider;
  @ViewChild('applicationsScripts') applicationsScriptsSlider;
  @ViewChild('unrecognizedFiles') unrecognizedFilesSlider;
  @ViewChild('passwordProtected') passwordProtectedSlider;

  @Input()
  set generalSettings(policy: Policy) {
    this._generalSettings = policy;
    this.videoSoundSlider.writeValue(policy.AttachmentsWithoutCdr.videoSound);
    this.applicationsScriptsSlider.writeValue(policy.AttachmentsWithoutCdr.applicationsScripts);
    this.unrecognizedFilesSlider.writeValue(policy.AttachmentsWithoutCdr.unrecognizedFiles);
    this.passwordProtectedSlider.writeValue(policy.SpecialAttachments.passwordProtected);
  }
  get generalSettings(): Policy {
    return this._generalSettings;
  }

  ngOnInit(): void {
    this.videoSoundSlider.registerOnChange((value) => {
      this._generalSettings.AttachmentsWithoutCdr.videoSound = value;
    });

    this.applicationsScriptsSlider.registerOnChange((value) => {
      this._generalSettings.AttachmentsWithoutCdr.applicationsScripts = value;
    });

    this.unrecognizedFilesSlider.registerOnChange((value) => {
      this._generalSettings.AttachmentsWithoutCdr.unrecognizedFiles = value;
    });

    this.passwordProtectedSlider.registerOnChange((value) => {
      this._generalSettings.SpecialAttachments.passwordProtected = value;
    });
  }
}

@Component({
  selector: 'special-attachments',
  templateUrl: './special-attachements.html',
  styleUrls: ['../general.component.css']
})

export class SpecialAttachmentsComponent extends GeneralSettingsBase implements OnInit {
  _generalSettings: Policy;

  @ViewChild('specialAttachmentSlider') specialAttachmentSlider;

  @Input()
  set generalSettings(policy: Policy) {
    this._generalSettings = policy;
    this.specialAttachmentSlider.writeValue(policy.SpecialAttachments.signedDocuments);
  }
  get generalSettings(): Policy {
    return this._generalSettings;
  }

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.specialAttachmentSlider.registerOnChange((value) => {
      this._generalSettings.SpecialAttachments.signedDocuments = value;
    });
  }
}
