import { Entity, PrimaryGeneratedColumn, BaseEntity, Column, ManyToOne, OneToMany } from 'typeorm';
import { Organization } from './Organization';
import { Position } from './Position';

@Entity()
export class Team extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name!: string;

  @OneToMany(type => Position, position => position.team)
  public positions!: Position[];

  @ManyToOne(type => Organization, { nullable: false })
  public organization!: Organization;
}
