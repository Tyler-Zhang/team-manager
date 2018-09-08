import { ExternalConnection } from './ExternalConnection';
import { ChildEntity } from 'typeorm';

@ChildEntity('GoogleExternalConnection')
export class GoogleExternalConnection extends ExternalConnection {
  get validUntil() {
    return new Date(this.data.validUntil);
  }

  set validUntil(value: Date) {
    this.data.validUntil = value.toString();
  }

  get token() {
    return this.data.token as string;
  }

  set token(value: string) {
    this.data.token = value;
  }

  get refreshToken() {
    return this.data.refreshToken as string;
  }

  set refreshToken(value: string) {
    this.data.refreshToken = value;
  }

  public get isValid() {
    return Date.now() < this.validUntil.getTime();
  }
}
