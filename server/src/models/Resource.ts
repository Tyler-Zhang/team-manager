import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index, TableInheritance, ManyToMany } from 'typeorm';
import { STIApplicationEntity } from './STIApplicationEntity';
import { Organization } from './Organization';
import { Team } from './Team';

import { GoogleDriveFileResource } from './Resource/GoogleDriveFileResource';

@Entity()
@TableInheritance({ column: { name: 'type', type: 'varchar' } })
export class Resource extends STIApplicationEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public type!: string;

  @Column({ type: 'json' })
  public data!: any;

  @Column({ type: 'int', nullable: false })
  @Index()
  public organizationId!: number;

  @ManyToOne(type => Organization)
  @JoinColumn({ name: 'organizationId' })
  public organization!: Organization;

  @ManyToMany(() => Team)
  public teams!: Team[];

  static get typeMap() {
    return {
      GoogleDriveFileResource
    }
  }

  constructor() {
    super();
    this.data = {};
  }
}
