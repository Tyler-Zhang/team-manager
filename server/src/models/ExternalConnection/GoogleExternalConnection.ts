import { ExternalConnection } from '../ExternalConnection';
import { ChildEntity, Column } from 'typeorm';

@ChildEntity('GoogleExternalConnection')
export class GoogleExternalConnection extends ExternalConnection {
  @Column()
  public refreshToken!: string;

  @Column()
  public token!: string;

  @Column()
  public validUntil!: Date;

  public get isValid() {
    return Date.now() < this.validUntil.getTime();
  }
}
