import { Entity, ManyToOne, Column, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ApplicationEntity } from './ApplicationEntity';
import { Team } from './Team';
import { Member } from './Member';
import { Type } from 'class-transformer';
import { Model } from '../lib/sti-model-operations';

@Model('Position')
@Entity()
export class Position extends ApplicationEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column('int', { primary: true })
  public teamId!: number;

  @Type(() => Team)
  @ManyToOne(type => Team)
  @JoinColumn({ name: 'teamId'})
  public team!: Team;

  @Column('int', { primary: true })
  public memberId!: number;

  @Type(() => Member)
  @ManyToOne(type => Member)
  @JoinColumn({ name: 'memberId' })
  public member!: Member;
}
