import { Entity, BaseEntity, ManyToOne, RelationId, Column, JoinColumn } from 'typeorm';
import { Team } from './Team';
import { Member } from './Member';
import { Type } from 'class-transformer';

@Entity()
export class Position extends BaseEntity {
  @Column('int', { primary: true })
  public teamId!: number;

  @Type(() => Team)
  @ManyToOne(type => Member)
  @JoinColumn({ name: 'teamId' })
  public team!: Team;

  @Column('int', { primary: true })
  public memberId!: number;

  @Type(() => Member)
  @ManyToOne(type => Member)
  @JoinColumn({ name: 'memberId' })
  public member!: Member;
}
