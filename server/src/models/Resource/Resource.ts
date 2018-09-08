import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index, TableInheritance, ManyToMany } from 'typeorm';
import { Organization } from '../Organization';
import { Team } from '../Team';
import { ApplicationEntity } from '../ApplicationEntity';

@Entity()
@TableInheritance({ column: { name: 'type', type: 'varchar' } })
export class Resource extends ApplicationEntity {
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

  constructor() {
    super();
    this.data = {};
  }
}
