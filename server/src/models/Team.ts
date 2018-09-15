import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, Index, ManyToMany, JoinTable } from 'typeorm';
import { ApplicationEntity } from './ApplicationEntity';
import { Organization } from './Organization';
import { Position } from './Position';
import { Type } from 'class-transformer';
import { Resource } from './Resource';
import { Model } from '../lib/sti-model-operations';

@Model('Team')
@Entity()
@Index(['organizationId', 'name'], { unique: true })
export class Team extends ApplicationEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name!: string;

  @Type(() => Position)
  @OneToMany(type => Position, position => position.team, { persistence: false })
  public positions!: Position[];

  @Column('int', { nullable: false })
  public organizationId!: number;

  @Type(() => Organization)
  @ManyToOne(type => Organization)
  @JoinColumn({ name: 'organizationId'})
  public organization!: Organization;

  @ManyToMany(() => Resource)
  @JoinTable()
  public resources!: Resource[];
}
