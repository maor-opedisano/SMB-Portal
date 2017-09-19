export class AnonymousLoginModel {

  ClientId: string;
  ClientPassword: string;
  constructor(ClientId: string, ClientPassword: string) {
    this.ClientId = ClientId;
    this.ClientPassword = ClientPassword;
  }
}

export class LoginAccessViewModel {
  UserName: string;
  AccessToken: string;
  UserRole: string;
  UserAdditionalData: any;
}
