import { ExternalConnection } from './ExternalConnection';
import { ChildEntity } from 'typeorm';
import { Credentials } from 'google-auth-library/build/src/auth/credentials';

@ChildEntity('GoogleExternalConnection')
export class GoogleExternalConnection extends ExternalConnection {
  public get expiryDate() {
    return new Date(this.data.validUntil);
  }

  public set expiryDate(value: Date) {
    this.data.validUntil = value.toString();
  }

  public get accessToken() {
    return this.data.token as string;
  }

  public set accessToken(value: string) {
    this.data.token = value;
  }

  public get refreshToken() {
    return this.data.refreshToken as string;
  }

  public set refreshToken(value: string) {
    this.data.refreshToken = value;
  }

  public get isValid() {
    return Date.now() < this.expiryDate.getTime();
  }
  
  public setFromCredential(credentials: Credentials) {
    this.refreshToken = credentials.refresh_token as string;
    this.accessToken = credentials.access_token as string;
    this.expiryDate = new Date(credentials.expiry_date as any);
  }

  public toCredential(): Credentials {
    return {
      access_token: this.accessToken,
      refresh_token: this.refreshToken,
      expiry_date: this.expiryDate.getTime()
    }
  }
}
