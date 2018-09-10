import { ChildEntity, ManyToOne, Generated, Column, Index} from 'typeorm';
import { Model } from '../../lib/sti-model-operations';
import { GoogleExternalConnection, ExternalConnection } from '../ExternalConnection';
import { IncomingWebhook } from './IncomingWebhook';

@Model('GoogleIncomingWebhook')
@ChildEntity('IncomingWebhook>GoogleIncomingWebhook')
export abstract class GoogleIncomingWebhook extends IncomingWebhook {  
  @Index({ unique: true })
  @Column()
  @Generated('uuid')
  public googleId!: string;
  
  @ManyToOne(type => ExternalConnection)
  public externalConnection!: GoogleExternalConnection;

  public get address(): string {
    return this.data.address;
  }

  public set address(value: string) {
    this.data.address = value;
  }

  public get token(): string {
    return this.data.token;
  }

  public set token(value: string) {
    this.data.token = value;
  }
}
