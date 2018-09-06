import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApplicationEntity } from './ApplicationEntity';
import { Member } from './Member';
import { Type } from 'class-transformer';

@Entity()
export class Organization extends ApplicationEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name!: string;

  @Type(() => Member)
  @OneToMany(type => Member, member => member.organization)
  public members!: Member[];
}
