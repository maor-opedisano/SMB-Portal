import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-wrong-browser',
  templateUrl: './wrong-browser.component.html',
  styleUrls: ['./wrong-browser.component.css']
})
export class WrongBrowserComponent implements OnInit {

  constructor(sanitizer: DomSanitizer, iconReg: MatIconRegistry) {
    iconReg.addSvgIcon('chromeLogo', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/chrome.svg'));
  }

  ngOnInit() {
  }

  downloadChrome() {
    window.location.href = 'https://www.google.fr/chrome/browser/desktop/index.html';
  }

}
