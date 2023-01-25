export interface MeResponse {
  id: string;
  accountExpired: boolean;
  accountLocked: boolean;
  customerId: number;
  dateCreated: string;
  email: string;
  enabled: boolean;
  lastUpdated: string;
  name: string;
  notificationsEnabled: boolean;
  passwordExpired: boolean;
  signupCredentialEmailSent: boolean;
  signupCredentialPushSent: boolean;
  signupEmailSent: boolean;
  signupFrom: string;
  termsAndConditionsAccepted: boolean;
  type: string;
  finerioCode: string;
  hasNewTerms: boolean;
}

export type Me = MeResponse;

export interface LoginResponse {
  username: string;
  roles: string[];
  token_type: string;
  access_token: string;
  expires_in: number;
  refresh_token: string;
}
