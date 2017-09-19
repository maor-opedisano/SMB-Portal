/**
 * Created by if_found_call_0586288454 on 27/04/2017 ap. J.-C..
 */

class Cdr {
  Documents: number;
  Images: number;
  Spreadsheets: number;
  Presentations: number;

  constructor(documents: number,
              images: number,
              spreadsheets: number,
              presentations: number) {
    this.Documents = documents;
    this.Images = images;
    this.Spreadsheets = spreadsheets;
    this.Presentations = presentations;
  }
}

/* Enums allow us to define a set of named numeric constants. since it will always be numbers and creating
 * a class with number properties can be cumbersome when we have properties that were stplitted string with space,
 * i chose to use enum instead of class */


export class NewSettingsModel {
  AttachementsProcessedLevels: Cdr;
  AttachementsWithoutCdr: object;
  PolicyName: string;
  Exceptions?: Array<string>;
}

export class ExistingSettingsModel {
  AttachementsProcessedLevels: Cdr;
  AttachementsWithoutCdr: any;
  SpecialAttachments: any;
  PolicyName: string;
  Exceptions?: Array<string>;
  PolicyId?: number;
  HandleLinks?: boolean;
  UseAntiviruses?: boolean;
}



