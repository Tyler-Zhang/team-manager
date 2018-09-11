import { ChildEntity, ManyToOne, Generated, Column, Index} from 'typeorm';
import { Model } from '../../lib/sti-model-operations';
import { GoogleExternalConnection, ExternalConnection } from '../ExternalConnection';
import { IncomingWebhook } from './IncomingWebhook';

const TYPE = 'IncomingWebhook>GoogleIncomingWebhook';

@Model('GoogleIncomingWebhook')
@ChildEntity(TYPE)
export abstract class GoogleIncomingWebhook extends IncomingWebhook {  
  @Index({ unique: true })
  @Column()
  @Generated('uuid')
  public googleId!: string;
  
  @ManyToOne(type => ExternalConnection)
  public externalConnection!: GoogleExternalConnection;

  public type = TYPE;

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
