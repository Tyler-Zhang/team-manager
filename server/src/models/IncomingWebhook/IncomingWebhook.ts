import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, TableInheritance, Index, JoinColumn } from 'typeorm';
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

  @Index({ unique: true })
  @Column()
  public externalId!: string;

  @Column()
  public isEnabled!: boolean;

  @Column('int')
  public externalConnectionId!: number;

  @ManyToOne(type => ExternalConnection, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'externalConnectionId' })
  public externalConnection!: ExternalConnection;

  constructor() {
    super();
    this.data = {};
    this.isEnabled = false;
  }
}
