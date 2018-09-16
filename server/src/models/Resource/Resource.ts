import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index, TableInheritance, ManyToMany, JoinTable } from 'typeorm';
import { Organization } from '../Organization';
import { Team } from '../Team';
import { ExternalConnection } from '../ExternalConnection';
import { ApplicationEntity } from '../ApplicationEntity';
import { Model } from '../../lib/sti-model-operations';

@Model('Resource')
@Entity()
@TableInheritance({ column: { name: 'type', type: 'varchar' } })
export abstract class Resource extends ApplicationEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  @Index()
  public externalId!: string;

  @Column()
  public name!: string;

  public type!: string;

  @Column({ type: 'json' })
  public data!: any;

  @Column({ type: 'int', nullable: false })
  @Index()
  public externalConnectionId!: number;

  @ManyToOne(() => ExternalConnection, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'externalConnectionId'})
  public externalConnection!: ExternalConnection;

  @Column({ type: 'int', nullable: false })
  @Index()
  public organizationId!: number;

  @ManyToOne(type => Organization, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'organizationId' })
  public organization!: Organization;

  @ManyToMany(() => Team)
  public teams!: Team[];

  constructor() {
    super();
    this.data = {};
  }
}
