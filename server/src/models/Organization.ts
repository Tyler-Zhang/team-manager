import { Entity, PrimaryGeneratedColumn, BaseEntity, Column, OneToMany } from 'typeorm';
import { Member } from './Member';
import { Type } from 'class-transformer';

@Entity()
export class Organization extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name!: string;

  @Type(() => Member)
  @OneToMany(type => Member, member => member.organization)
  public members!: Member[];
}
