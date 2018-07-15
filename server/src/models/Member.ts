import { Entity, PrimaryGeneratedColumn, BaseEntity, Column, ManyToOne } from 'typeorm';
import { Organization } from './Organization';

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

  @ManyToOne(type => Organization, { nullable: false })
  public organization!: Organization;
}
