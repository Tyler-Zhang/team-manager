import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index, TableInheritance } from 'typeorm';
import { STIApplicationEntity } from './STIApplicationEntity';
import { Organization } from './Organization';
import { Type } from 'class-transformer';
import { GoogleExternalConnection } from './ExternalConnection/GoogleExternalConnection';

@Entity()
@TableInheritance({ column: { name: 'type', type: 'varchar' } })
export abstract class ExternalConnection extends STIApplicationEntity {
  @PrimaryGeneratedColumn()
  public id!: number;
  
  @Column()
  public type!: string;

  @Column({ type: 'json' })
  public data!: any;

  @Column({ type: 'int', nullable: false })
  @Index()
  public organizationId!: number;

  @Type(() => Organization)
  @ManyToOne(type => Organization)
  @JoinColumn({ name: 'organizationId' })
  public organization!: Organization;

  public static get typeMap() {
    return {
      GoogleExternalConnection
    }
  }

  constructor() {
    super();
    this.data = {};
  }
}
