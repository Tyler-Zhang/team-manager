import { Entity, PrimaryGeneratedColumn, BaseEntity, Column, ManyToOne, OneToMany } from 'typeorm';
import { Organization } from './Organization';
import { Position } from './Position';

@Entity()
export class Member extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public firstName!: string;

  @Column()
  public lastName!: string;

  @Column()
  public email!: string;

  @Column({ nullable: true })
  public phoneNumber?: string;

  @OneToMany(type => Position, position => position.member)
  public positions!: Position[];

  @ManyToOne(type => Organization, { nullable: false })
  public organization!: Organization;
}
