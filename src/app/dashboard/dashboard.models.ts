/**
 * Created by if_found_call_0586288454 on 08/06/2017 ap. J.-C..
 */

export class SeriesModel {
  name: string;
  value: number;
}

export class GraphDataModel {
  name: string;
  series: Array<SeriesModel>;
  constructor(name: string) {
    this.name = name;
  }
}
export class ArticleModel {
  title: string;
  date: string;
  url: string;
  description: string;
  image: string;
  constructor(title: string, date: string, url: string, description: string, image: string) {
    this.title = title;
    this.date = date;
    this.url = url;
    this.description = description;
    this.image = image;
  }
}
export interface SelfOnBoardDashboardModel {
  TotalBlockedByPolicy: TotalCollectionResultsModel;
  TotalBlockedByAntivirus: TotalCollectionResultsModel;
  TotalProcessedByCdr: {};
  TotalModified: TotalCollectionResultsModel;
  TotalFailed: {};
  TotalPassed: TotalCollectionResultsModel;
  TopSendersRecipientsAddresses: TopSendersRecipientsAddressesModel;
  TotalSanitizationsPerDate: TotalSanitizationsPerDateModel;
  AttachmentList: string[];
  TotalUrls: number;
  TotalAttachmentProcessed: TotalCollectionResultsModel;
  TotalEmailsProcessed: number;
}
interface TotalCollectionResultsModel {
  TotalAttachmentsResult: number;
  TotalResult: number;
  TotalsDictionary: {};
  OtherFileTypes: string[];
  TopFiveFileTypes: {};
}
interface TopSendersRecipientsAddressesModel {
  TopSenders: TopSendersModel;
  TopRecipients: TopSendersModel;
}

interface TopSendersModel {
  TotalBlockedByPolicy: TotalCollectionResultsModel[];
  TotalBlockedByAntivirus: any[];
  TotalPassed: TotalCollectionResultsModel[];
  TotalModified: TotalCollectionResultsModel[];
  AllAttachments: TotalCollectionResultsModel[];
}
interface TotalSanitizationsPerDateModel {
  TotalPassedGraphList: TotalCollectionResultsModel[];
  TotalCdrGraphList: TotalCollectionResultsModel[];
  TotalBlockedByPolicyGraphList: TotalCollectionResultsModel[];
  TotalBlockedByAvGraphList: TotalCollectionResultsModel[];
}
