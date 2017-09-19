import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashboardService } from '../dashboard/dashboard.service';
// import { array as _arr1, collection as _col1 } from 'lodash';
// import _ from 'lodash';
import * as _arr from 'lodash/array';
import * as _col from 'lodash/collection';
import {
  TotalsTopComponent,
  GraphSelectorComponent,
  GraphComponent,
  PieChartsComponent,
  EmailSectionComponent,
  NewsFeedComponent
} from './templates/dashboard-templates/dashboard-templates.component';
import { GraphDataModel } from './dashboard.models';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DashboardService],
  entryComponents: [TotalsTopComponent, GraphSelectorComponent,
    GraphComponent, PieChartsComponent, EmailSectionComponent, NewsFeedComponent]
})

export class DashboardComponent implements OnInit, OnDestroy {
  graphData: any;
  currGraphData: any;
  getDashboardData: any;
  recipientValueColor = '#9A1796';
  totals: any = {};
  dataHasLoaded = false;
  allData: any = {};
  feeds: Array<any>;
  pieData: any = {};
  NoDatapieData = [{ 'name': 'No Data', 'value': 10 }];
  senders: Array<string>;
  selectedGraphHasNoData: boolean;
  recipients: Array<string>;
  topSenders: any;
  topRecipients: any;
  colorScheme = { domain: ['#326491', '#4D9CE3', '#234768', '#6CAEE8', '#ADD2F2'] };
  graphColor = {
    domain: ['#9A1796', '#EE5F12', '#7BBDEE', '#F9C453']
  };
  pieChartTitle = '';
  private cleanReplica: any;
  private attachmentOk: any;
  private blockedByPolicy: any;
  private attachmentBlockedByAntivirus: any;
  timeFrame = 30;

  constructor(private dashboardService: DashboardService) {
  };

  ngOnInit() {
    this.GetFeed();
    this.loadDashboardData(this.timeFrame);
  };

  changeTimeFrame = (newTime: number) => {
    this.timeFrame = newTime;
    this.loadDashboardData(newTime);
  }
  dictionaryToObject = (dictionary: any) => {

    const arr = [];
    _col.each(dictionary, (value, key) => {
      const newObject = {
        'name': key,
        'value': value
      };
      arr.push(newObject);
    });
    return arr.slice(0, 5);
  }

  makeArrayOfRandomFeeds(arrayOfFeeds: Array<any>): Array<any> {
    return _arr.take(arrayOfFeeds, 3);
  }

  GetFeed = () => {
     this.dashboardService.GetFeed().subscribe(
        res => {
          const feed = res;
          this.feeds = this.makeArrayOfRandomFeeds(feed);
          console.log(this.feeds);
        },
        error => console.log(error)
       );
  }


  selectedGraphChanged(event) {
    switch (event) {
      case 'totals.totalCleanReplicaByCdr':
        this.graphData = [this.cleanReplica];
        this.colorScheme = { domain: ['#326491', '#4D9CE3', '#234768', '#6CAEE8', '#ADD2F2'] };
        this.graphColor = { domain: ['#326491'] };
        this.pieChartTitle = 'Clean Replica By CDR';
        this.recipientValueColor = '#A5CDED';
        this.senders = this.topSenders.TotalModified;
        this.recipients = this.topRecipients.TotalModified;
        if (this.allData.TotalModified.TotalResult > 0) {
          this.pieData = this.dictionaryToObject(this.allData.TotalModified.TopFiveFileTypes);
        } else {
          this.pieData = this.NoDatapieData;
          this.selectedGraphHasNoData = true;

        }
        break;
      case 'totals.attachmentOk':
        this.graphData = [this.attachmentOk];
        this.colorScheme.domain = ['#33796C', '#4FBDAA', '#25574E', '#429B8B', '#AFE1D8'];
        this.graphColor = { domain: ['#33796C'] };
        this.pieChartTitle = 'Original Attachment OK';
        this.recipientValueColor = '#A4DCD2';
        this.senders = this.topSenders.TotalPassed;
        this.recipients = this.topRecipients.TotalPassed;
        if (this.allData.TotalPassed.TotalResult > 0) {
          this.pieData = this.dictionaryToObject(this.allData.TotalPassed.TopFiveFileTypes);
        } else {
          this.pieData = this.NoDatapieData;
          this.selectedGraphHasNoData = true;

        }
        break;
      case 'totals.blockedByPolicy':
        this.graphData = [this.blockedByPolicy];
        this.graphColor = { domain: ['#C98F20'] };
        this.colorScheme.domain = ['#C98F20', '#F4AE29', '#6F500D', '#F8CA72', '#FBE7C2'];
        this.pieChartTitle = 'Attachment Blocked by Policy';
        this.recipientValueColor = '#F7D399';
        this.senders = this.topSenders.TotalBlockedByPolicy;
        this.recipients = this.topRecipients.TotalBlockedByPolicy;
        if (this.allData.TotalBlockedByPolicy.TotalResult > 0) {
          this.pieData = this.dictionaryToObject(this.allData.TotalBlockedByPolicy.TopFiveFileTypes);
        } else {
          this.pieData = this.NoDatapieData;
          this.selectedGraphHasNoData = true;

        }
        break;
      case 'totals.attachmentBlockedByAntivirus':
        this.graphData = [this.attachmentBlockedByAntivirus];
        this.colorScheme.domain = ['#994110', '#EF661F', '#6D2F08', '#F1813C', '#F8B994'];
        this.graphColor = { domain: ['#994110'] };
        this.pieChartTitle = 'Attachment Blocked By Antivirus';
        this.recipientValueColor = '#F5AF91';
        this.senders = this.topSenders.TotalBlockedByAntivirus;
        this.recipients = this.topRecipients.TotalBlockedByAntivirus;
        if (this.allData.TotalBlockedByAntivirus.TotalResult > 0) {
          this.pieData = this.dictionaryToObject(this.allData.TotalBlockedByAntivirus.TopFiveFileTypes);
        } else {
          this.pieData = this.NoDatapieData;
          this.selectedGraphHasNoData = true;

        }
        break;
    }
  }

  makeDataGraphReadable(objectName: string, data: any) {
    const graphObject = new GraphDataModel(objectName);
    const serializedData = [];
    for (const measurement of data) {
      const object: any = {};
      object.name = new Date(measurement.Key);
      object.value = measurement.Value;
      serializedData.push(object);
    }
    graphObject.series = serializedData;
    return graphObject;
  }

  showAllGraphs = (event) => {
    this.graphData = this.currGraphData;
    this.colorScheme = { domain: ['#582662', '#893D99', '#3F1D45', '#9E5FAB', '#C9A6D1'] };
    this.graphColor = {
      domain: ['#9A1796', '#EE5F12', '#7BBDEE', '#F9C453']
    };
    this.recipientValueColor = '#9A1796';
    this.pieChartTitle = 'Total Passed Files';
    this.senders = this.topSenders.AllAttachments;
    this.recipients = this.topRecipients.AllAttachments;
    // handle total attachment processed
    if (this.allData.TotalAttachmentProcessed.TotalResult > 0) {
      this.pieData = this.dictionaryToObject(this.allData.TotalAttachmentProcessed.TopFiveFileTypes);
    } else {
      this.pieData = this.NoDatapieData;
      this.selectedGraphHasNoData = true;
    }

  }

  loadDashboardData(timeFrame: number) {
    this.dashboardService.getDashboardData(timeFrame).subscribe(
      res => {
        if (!res) {
          return;
        }
        this.allData = res;
        this.totals.TotalEmailsProcessed = res.TotalEmailsProcessed;
        this.pieData = this.dictionaryToObject(res.TotalBlockedByPolicy);
        this.totals.TotalUrls = res.TotalUrls;
        this.totals.TotalAttachmentProcessed = res.TotalAttachmentProcessed;
        if (this.totals.TotalAttachmentProcessed > 0) {
          this.selectedGraphHasNoData = false;
        } else {
          this.pieData = this.NoDatapieData;
          this.selectedGraphHasNoData = true;
        }
        this.topRecipients = res.TopSendersRecipientsAddresses.TopRecipients;
        this.topSenders = res.TopSendersRecipientsAddresses.TopSenders;
        this.recipients = this.topRecipients.AllAttachments;
        this.senders = this.topSenders.AllAttachments;
        this.cleanReplica = this.makeDataGraphReadable('Clean Replica By CDR', this.allData.TotalSanitizationsPerDate.TotalCdrGraphList);
        this.attachmentOk = this.makeDataGraphReadable('Attachments Passed OK', this.allData.TotalSanitizationsPerDate.TotalPassedGraphList);
        this.blockedByPolicy = this.makeDataGraphReadable('Blocked By Policy', this.allData.TotalSanitizationsPerDate.TotalBlockedByPolicyGraphList);
        this.attachmentBlockedByAntivirus = this.makeDataGraphReadable('Blocked By Antivirus', this.allData.TotalSanitizationsPerDate.TotalBlockedByAvGraphList);
        this.currGraphData =
          [
            this.cleanReplica, this.attachmentBlockedByAntivirus, this.attachmentOk, this.blockedByPolicy
          ];

        this.graphData = this.currGraphData;
        this.showAllGraphs(null);

        // GraphComponent.Multi =
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.dataHasLoaded = true;
      });
  }

  ngOnDestroy() {
    if (this.getDashboardData) {
      this.getDashboardData.unsubscribe();
    }
  }

}


