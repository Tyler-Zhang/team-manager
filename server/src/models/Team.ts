import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, Index } from 'typeorm';
import { ApplicationEntity } from './ApplicationEntity';
import { Organization } from './Organization';
import { Position } from './Position';
import { Type } from 'class-transformer';

@Entity()
@Index(['organizationId', 'name'], { unique: true })
export class Team extends ApplicationEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name!: string;

  @Type(() => Position)
  @OneToMany(type => Position, position => position.team)
  public positions!: Position[];

  @Column('int', { nullable: false })
  public organizationId!: number;

  @Type(() => Organization)
  @ManyToOne(type => Organization)
  @JoinColumn({ name: 'organizationId'})
  public organization!: Organization;
}
