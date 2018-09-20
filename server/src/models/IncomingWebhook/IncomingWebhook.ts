import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, TableInheritance } from 'typeorm';
import { ApplicationEntity } from '../ApplicationEntity';
import { Model } from '../../lib/sti-model-operations';
import { ExternalConnection } from '../ExternalConnection';

@Model('IncomingWebhook')
@Entity()
@TableInheritance({ column: { name: 'type', type: 'varchar' } })
export abstract class IncomingWebhook extends ApplicationEntity {
  @PrimaryGeneratedColumn()
  public id!: number;
  
  @Column()
  public type!: string;

  @Column({ type: 'json' })
  public data!: any;

  @Column()
  public isEnabled!: boolean;

  @ManyToOne(type => ExternalConnection, { nullable: false })
  public externalConnection!: ExternalConnection;

  constructor() {
    super();
    this.data = {};
    this.isEnabled = false;
  }
}
