import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as d3 from 'd3';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-top-totals',
  templateUrl: './totals-top.component.html',
  styleUrls: ['./dashboard-templates.component.css']
})
export class TotalsTopComponent {
  @Input() totals;
  @Output() onTotalSelected = new EventEmitter<any>();

  constructor() {
  }

  displayTotals = (event) => {
    console.log(event);
    this.onTotalSelected.emit(event);
  }
}

@Component({
  selector: 'app-dashboard-graph-selector',
  templateUrl: './graph-selector.html',
  styleUrls: ['./dashboard-templates.component.css']
})

export class GraphSelectorComponent {
  @Input() totals;
  @Output() onGraphChanged = new EventEmitter<any>();

  colorScheme: any = {
    domain: ['#1565C0', '#03A9F4', '#FFA726', '#FFCC80'],
  };

  changeTheCurrentLine(event, graphDatastr) {
    if (graphDatastr) {
      this.onGraphChanged.emit(graphDatastr);
    }
    ;
  }

  constructor() {
  };
}

@Component({
  selector: 'app-dashboard-graph',
  templateUrl: './graphs.html',
  styleUrls: ['./dashboard-templates.component.css']
})

export class GraphComponent implements OnInit {
  @Input() graphData: any;
  curving: any;
  @Input() graphColor: string;
  view: any[];
  showXAxis = true;
  showYAxis = false;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = '';
  showYAxisLabel = false;
  yAxisLabel = 'Month';
  showGridLines = true;
  schemeType = 'linear';
  colorScheme = {
    domain: ['#9A1796', '#EE5F12', '#7BBDEE', '#F9C453']
  };
  // lie, area
  constructor() {
    this.curving = d3.curveCardinal;
    this.view = undefined;
  }

  ngOnInit() {
  }
}

@Component({
  selector: 'app-dashboard-pie-charts',
  templateUrl: './pie-charts.html',
  styleUrls: ['./dashboard-templates.component.css']
})

export class PieChartsComponent {
  view = [400, 300];
  @Input() pieData;
  @Input() selectedGraphHasNoData: boolean;
  @Input() title: string;
  @Input() colorScheme;
  NoDatacolorScheme = { domain: ['#999'] };
  NoDatapieData = [{ 'name': 'No Data', 'value': 0 }];
  tooltipText = (r) => {
    if (r.data.name === 'No Data') {
      return '';
    }

    return r.data.name + ' ' + r.data.value;
  }
}

@Component({
  selector: 'app-email-section',
  templateUrl: './email-section.html',
  styleUrls: ['./dashboard-templates.component.css']
})

export class EmailSectionComponent {
  @Input() senders;
  @Input() recipients;
  @Input() title: string;
  displayingSenders = false;
  @Input() recipientValueColor: string;
  displayingRecipients = true;

  constructor(private router: Router) {
  }

  displaySenders() {
    this.displayingRecipients = false;
    this.displayingSenders = true;
  }

  displayRecipients() {
    this.displayingRecipients = true;
    this.displayingSenders = false;
  }

  seeAllRelatedMails(type: string, mail: string) {
    switch (type) {
      case 'sender':
        console.log('sender');
        this.router.navigate(['user/emails/browse'], { queryParams: { sender: mail } });
        break;
      case 'recipient':
        console.log('recipient');
        this.router.navigate(['user/emails/browse'], { queryParams: { recipient: mail } });
        break;
    }
  }
}

@Component({
  selector: 'app-dashboard-news-feed',
  templateUrl: './news.html',
  styleUrls: ['./dashboard-templates.component.css']
})

export class NewsFeedComponent {

  @Input() feeds;
}
