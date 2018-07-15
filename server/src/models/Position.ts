import { Entity, PrimaryGeneratedColumn, BaseEntity, Column, ManyToOne, OneToMany } from 'typeorm';
import { Team } from './Team';
import { Member } from './Member';

@Entity()
export class Position extends BaseEntity {
  @ManyToOne(type => Team, { primary: true })
  public team!: Team;

  @ManyToOne(type => Member, { primary: true })
  public member!: Member;
}
