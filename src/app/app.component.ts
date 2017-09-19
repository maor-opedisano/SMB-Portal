import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {
  }

  ngOnInit() {
    this.detectBrowser();
  }

  detectBrowser() {
    const isChrome = (navigator.userAgent.toLowerCase().includes('chrome')) ? true : false;
    if (!isChrome) {
      this.router.navigate(['wrong-browser']);
    }
  }
}
