export class ResultsModel<T> {
  List: Array<T>;
  Total: number;
}

export class EmailModel {
  'Ticket ID': string;
  'SanitizationId': number;
  'Reason Blocked': string;
  'Reason Blocked Details': string;
  'SanitizationDate': string;
  'Date': string;
  'Recipient': string;
  'Sender': string;
  'Subject': string;
  'Attached Files': string[];
  'AttachedFiles': string;
  'Attached Files Outcomes': {};
  'AttachedFilesOutcomes': string;
}

